import React from 'react';
import { render, cleanup } from 'react-testing-library';

import { getTokenizedAssets } from 'src/__fixtures__/assets';
import mouseEvent from 'src/__utils__/mouseEvent';

import AssetSelector from '../index';

describe('<AssetSelector> component', () => {
  afterEach(cleanup);

  describe('Render', () => {
    const availableAssets = getTokenizedAssets();
    const onChange = jest.fn();

    describe('collapsed', () => {
      describe('Tokenized asset', () => {
        it('should render component properly', () => {
          const selectedAsset = availableAssets.find(
            asset => asset.name === 'BTC'
          );
          const excludedAsset = availableAssets.find(
            asset => asset.name === 'ETH'
          );

          const { container, queryByText } = render(
            <AssetSelector
              availableAssets={availableAssets}
              selectedAsset={selectedAsset}
              excludedAsset={excludedAsset}
              onChange={onChange}
            />
          );

          expect(container).not.toBeNull();

          expect(queryByText('btc-coin.svg')).not.toBeNull();
          expect(queryByText('otn-icon.svg')).not.toBeNull();
          expect(queryByText('arrow-down.svg')).not.toBeNull();

          expect(queryByText('OTN.BTC')).not.toBeNull();
          expect(queryByText('Bitcoin Tokenized')).not.toBeNull();
        });
      });

      describe('OTN asset', () => {
        it('should render component properly', () => {
          const selectedAsset = availableAssets.find(
            asset => asset.name === 'OTN'
          );
          const excludedAsset = availableAssets.find(
            asset => asset.name === 'ETH'
          );

          const { container, queryByText } = render(
            <AssetSelector
              availableAssets={availableAssets}
              selectedAsset={selectedAsset}
              excludedAsset={excludedAsset}
              onChange={onChange}
            />
          );

          expect(container).not.toBeNull();

          expect(queryByText('otn-coin.svg')).not.toBeNull();
          expect(queryByText('arrow-down.svg')).not.toBeNull();

          expect(queryByText('OTN')).not.toBeNull();
          expect(queryByText('Open Trading Network')).not.toBeNull();
        });
      });
    });

    describe('opened', () => {
      it('should render component properly', () => {
        const selectedAsset = availableAssets.find(
          asset => asset.name === 'OTN'
        );
        const excludedAsset = availableAssets.find(
          asset => asset.name === 'ETH'
        );

        const { container, queryByText, queryAllByText } = render(
          <AssetSelector
            availableAssets={availableAssets}
            selectedAsset={selectedAsset}
            excludedAsset={excludedAsset}
            onChange={onChange}
          />
        );

        expect(container).not.toBeNull();

        mouseEvent.mouseDown(queryByText('OTN'));

        expect(
          container.getElementsByClassName('Select-menu')
        ).not.toHaveLength(0);

        expect(queryAllByText('OTN')).toHaveLength(2);
        expect(queryAllByText('otn-coin.svg')).toHaveLength(2);

        expect(queryByText('OTN.BTC')).not.toBeNull();
        expect(queryByText('btc-coin.svg')).not.toBeNull();
      });
    });

    describe('select item', () => {
      it('should render component properly', () => {
        const selectedAsset = availableAssets.find(
          asset => asset.name === 'OTN'
        );
        const excludedAsset = availableAssets.find(
          asset => asset.name === 'ETH'
        );
        const btc = availableAssets.find(asset => asset.name === 'BTC');
        const onChange = jest.fn();

        const { container, queryByText, rerender } = render(
          <AssetSelector
            availableAssets={availableAssets}
            selectedAsset={selectedAsset}
            excludedAsset={excludedAsset}
            onChange={onChange}
          />
        );

        expect(container).not.toBeNull();

        mouseEvent.mouseDown(queryByText('OTN'));
        mouseEvent.mouseDown(queryByText('OTN.BTC'));

        expect(onChange).toBeCalledWith(btc);

        rerender(
          <AssetSelector
            availableAssets={availableAssets}
            selectedAsset={btc}
            excludedAsset={excludedAsset}
            onChange={onChange}
          />
        );

        expect(queryByText('btc-coin.svg')).not.toBeNull();
        expect(queryByText('otn-icon.svg')).not.toBeNull();
        expect(queryByText('arrow-down.svg')).not.toBeNull();

        expect(queryByText('OTN.BTC')).not.toBeNull();
        expect(queryByText('Bitcoin Tokenized')).not.toBeNull();
      });
    });

    describe('without excluded', () => {
      it('should render component properly', () => {
        const selectedAsset = availableAssets.find(
          asset => asset.name === 'OTN'
        );

        const { container, queryByText, queryAllByText } = render(
          <AssetSelector
            availableAssets={availableAssets}
            selectedAsset={selectedAsset}
            onChange={onChange}
          />
        );

        expect(container).not.toBeNull();

        mouseEvent.mouseDown(queryByText('OTN'));

        expect(
          container.getElementsByClassName('Select-menu')
        ).not.toHaveLength(0);

        expect(queryAllByText('OTN')).toHaveLength(2);
        expect(queryAllByText('otn-coin.svg')).toHaveLength(2);

        expect(queryByText('OTN.BTC')).not.toBeNull();
        expect(queryByText('btc-coin.svg')).not.toBeNull();

        expect(queryByText('OTN.ETH')).not.toBeNull();
        expect(queryByText('eth-coin.svg')).not.toBeNull();
      });
    });
  });
});
