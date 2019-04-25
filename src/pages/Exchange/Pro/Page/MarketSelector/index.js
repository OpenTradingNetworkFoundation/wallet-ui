import React from 'react';
import Downshift from 'downshift';
import { curry, omit } from 'ramda';
import { isObject } from 'lodash';
import { AutoSizer, List } from 'react-virtualized';

import localStorage from 'utils/localStorage';

import AssetAmount from 'src/models/AssetAmount';
import CurrencyPair from 'pages/Exchange/Pro/Page/CurrencyPair';
import VolumePrice from 'pages/Exchange/Pro/Page/VolumePrice';
import MarkAsFavorite from 'pages/Exchange/Pro/Page/MarketSelector/MarkAsFavorite';

import Translate from 'elements/Translate';
import Percentage from 'elements/Percentage';
import AssetIcon from 'elements/AssetIcon';

import ArrowDownIcon from 'icons/arrow-down.svg';

import MarketsList from './MarketsList';
import { combinations, filterOptions, createMarket } from './helpers';
import {
  ArrowDown,
  MarketsSelect,
  Market,
  Selector,
  Digits,
  Label,
  Information,
  Volume,
  Markets,
  BaseList,
  BaseSelector,
  Base
} from './styled';

import { propTypes } from './props';

const getFavoriteMarkets = () => {
  const markets = localStorage.get('favoriteMarkets');
  return isObject(markets) ? markets : {};
};

const defaultPrecision = 8;

class MarketSelector extends React.Component {
  static propTypes = propTypes;

  state = {
    items: [],
    selectedBase: '',
    favoriteMarkets: []
  };

  componentDidMount() {
    this.updateFavoriteMarkets();
  }

  updateFavoriteMarkets = () => {
    const favoriteMarkets = getFavoriteMarkets();
    this.setState({
      items: combinations(favoriteMarkets, this.props.supportedAssets),
      favoriteMarkets
    });
  };

  markAsFavorite = curry((item, event) => {
    // event propagates to market and causes selection, but here
    // we need to stop that
    event.stopPropagation();

    this.setState(
      state => {
        const market = createMarket(item.base, item.quote);
        const timeAdded = new Date();

        const isFavorite = !!state.favoriteMarkets[market];

        const favoriteMarkets = isFavorite
          ? omit([market], state.favoriteMarkets)
          : { ...state.favoriteMarkets, [market]: timeAdded };

        return {
          favoriteMarkets
        };
      },
      () => localStorage.set('favoriteMarkets', this.state.favoriteMarkets)
    );
  });

  render() {
    const {
      currentlySelectedMarket,
      handleItemSelect,
      supportedAssets
    } = this.props;

    const { items, selectedBase } = this.state;
    const filteredOptions = filterOptions(items, selectedBase);

    return (
      <Downshift
        onChange={item => handleItemSelect(item)}
        selectedItem={currentlySelectedMarket}
        itemToString={item => item.base + item.quote}
      >
        {({ toggleMenu, getMenuProps, isOpen, selectedItem, selectItem }) => (
          <div>
            <MarketsSelect>
              <Market
                data-testid="marketListLabel"
                onClick={() => {
                  this.updateFavoriteMarkets();

                  toggleMenu();
                }}
              >
                <Selector>
                  <CurrencyPair
                    base={selectedItem.base}
                    quote={selectedItem.quote}
                  />
                  <ArrowDown>
                    <ArrowDownIcon />
                  </ArrowDown>
                </Selector>
                <VolumePrice
                  base={selectedItem.base}
                  quote={selectedItem.quote}
                >
                  {(volume, percentage) => (
                    <Information>
                      <Label auto>
                        <Translate path="page.exchangePro.24hVolume" />
                      </Label>
                      <Volume>
                        {volume} {selectedItem.base}
                      </Volume>
                      <Label auto>
                        <Translate path="page.exchangePro.24hChange" />
                      </Label>
                      <Digits percentage={percentage}>
                        <Percentage>{percentage}</Percentage>
                      </Digits>
                    </Information>
                  )}
                </VolumePrice>
              </Market>
              {isOpen ? (
                <Markets>
                  <BaseSelector>
                    <BaseList>
                      <Base
                        active={selectedBase === ''}
                        onClick={() => this.setState({ selectedBase: '' })}
                      >
                        All
                      </Base>
                      {supportedAssets.map(asset => (
                        <Base
                          key={asset}
                          onClick={() => this.setState({ selectedBase: asset })}
                          active={selectedBase === asset}
                        >
                          <AssetIcon assetName={asset} /> {asset}
                        </Base>
                      ))}
                    </BaseList>
                  </BaseSelector>
                  <MarketsList {...getMenuProps()} options={filteredOptions}>
                    {items => (
                      <AutoSizer>
                        {({ width, height }) => (
                          <List
                            style={{ outline: 0 }}
                            width={width}
                            height={height}
                            rowHeight={40}
                            rowCount={items.length}
                            rowRenderer={({ index, key, style }) => {
                              const item = items[index];
                              return (
                                <Market
                                  style={style}
                                  key={key}
                                  onClick={() => selectItem(item)}
                                >
                                  <CurrencyPair
                                    base={item.base}
                                    quote={item.quote}
                                  />
                                  <VolumePrice
                                    base={item.base}
                                    quote={item.quote}
                                  >
                                    {(volume, percentage, price) => (
                                      <Information>
                                        <Digits fontSize="14px" price>
                                          {AssetAmount.round(
                                            price,
                                            defaultPrecision
                                          )}
                                        </Digits>
                                        <Digits
                                          fontSize="14px"
                                          percentage={percentage}
                                        >
                                          <Percentage>{percentage}</Percentage>
                                        </Digits>
                                      </Information>
                                    )}
                                  </VolumePrice>
                                  <MarkAsFavorite
                                    handleClick={this.markAsFavorite(item)}
                                    marked={
                                      !!this.state.favoriteMarkets[
                                        createMarket(item.base, item.quote)
                                      ]
                                    }
                                  />
                                </Market>
                              );
                            }}
                          />
                        )}
                      </AutoSizer>
                    )}
                  </MarketsList>
                </Markets>
              ) : null}
            </MarketsSelect>
          </div>
        )}
      </Downshift>
    );
  }
}

export default MarketSelector;
