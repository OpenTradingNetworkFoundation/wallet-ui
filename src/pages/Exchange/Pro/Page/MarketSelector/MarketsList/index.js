import React from 'react';

import memoizeOne from 'memoize-one';
import { isEqual } from 'lodash';

import Translate from 'elements/Translate';
import translate from 'services/translate';

import MarketSearch from 'icons/market-search.svg';

import { Label, Information } from '../styled';

import { propTypes } from './props';
import {
  MarketsHeader,
  MarketsListContainer,
  MarketsSelector,
  MarketsSearch,
  MarketsSearchInput,
  NoMatch,
  NoMatchIcon,
  NoMatchText
} from './styled';

const filterOptions = memoizeOne((options, searchValue) =>
  options.filter(
    ({ base, quote }) =>
      base.toLowerCase().includes(searchValue.toLowerCase()) ||
      quote.toLowerCase().includes(searchValue.toLowerCase())
  )
);

class MarketsList extends React.Component {
  static propTypes = propTypes;

  state = {
    searchValue: ''
  };

  componentDidMount() {
    this.searchInput.focus();
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.options, this.props.options)) {
      this.marketsListContainer.scrollTop = 0;
    }
  }

  render() {
    const { options } = this.props;
    const filteredOptions = filterOptions(options, this.state.searchValue);
    return (
      <MarketsSelector data-testid="marketsListSelector">
        <MarketsSearch data-testid="marketsListSelectorInput">
          <MarketsSearchInput
            type="text"
            onChange={({ target: { value } }) =>
              this.setState({ searchValue: value })
            }
            innerRef={element => (this.searchInput = element)}
            value={this.state.searchValue}
            placeholder={translate('page.exchangePro.searchByAsset')}
          />
        </MarketsSearch>
        {filteredOptions.length > 0 ? (
          <React.Fragment>
            <MarketsHeader>
              <Label fontSize="12px" flex="0 0 120px">
                <Translate path="page.exchangePro.market" />
              </Label>
              <Information header={true}>
                <Label price>
                  <Translate path="page.exchangePro.price" />
                </Label>
                <Label>
                  <Translate path="page.exchangePro.24hChange" />
                </Label>
              </Information>
            </MarketsHeader>
            <MarketsListContainer
              data-testid="marketsListSelectorContainer"
              innerRef={element => (this.marketsListContainer = element)}
            >
              {this.props.children(filteredOptions)}
            </MarketsListContainer>
          </React.Fragment>
        ) : (
          <NoMatch>
            <NoMatchIcon>
              <MarketSearch />
            </NoMatchIcon>
            <NoMatchText>
              <Translate path="page.exchangePro.noMatch" />
            </NoMatchText>
          </NoMatch>
        )}
      </MarketsSelector>
    );
  }
}

export default MarketsList;
