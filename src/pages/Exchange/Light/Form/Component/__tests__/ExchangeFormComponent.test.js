import React from 'react';
import { fireEvent, cleanup } from 'react-testing-library';

import { getTokenizedAssets } from 'src/__fixtures__/assets';
import { renderWithRedux } from 'src/__utils__';
import mouseEvent from 'src/__utils__/mouseEvent';

import ExchangeFormComponent from '../index';

const getProps = () => {
  const onFromAssetChange = jest.fn();
  const onToAssetChange = jest.fn();
  const onFromAmountChange = jest.fn();
  const onMaxClick = jest.fn();
  const onToAmountChange = jest.fn();
  const onFeeAssetChange = jest.fn();
  const onFormSubmit = jest.fn();
  const onExchangeAssets = jest.fn();

  const balances = getTokenizedAssets();
  const otn = balances.find(balance => balance.name === 'OTN');
  const btc = balances.find(balance => balance.name === 'BTC');

  const feeAmount = '10000';

  return {
    onFromAssetChange,
    onFromAmountChange,
    onToAssetChange,
    onToAmountChange,
    onMaxClick,
    onFeeAssetChange,
    onFormSubmit,
    onExchangeAssets,
    fields: {
      toAsset: btc,
      fromAsset: otn,
      feeAsset: otn,
      toAmount: '',
      fromAmount: ''
    },
    validation: {
      toAmount: null,
      fromAmount: null,
      invalid: false
    },
    meta: {
      fromMaxAmount: '9.9999'
    },
    data: {
      priceMeta: {
        isAvailable: true,
        price: '4000'
      },
      fee: {
        isLoading: false,
        feeAmount: feeAmount
      },
      exchangeScheme: {
        [otn.id]: balances,
        [btc.id]: balances
      },
      availableBalances: balances
    }
  };
};

describe('<ExchangeFormComponent />', () => {
  afterEach(cleanup);

  describe('render', () => {
    test('should render component properly', () => {
      const props = getProps();

      const { container, getByText, getAllByText } = renderWithRedux(
        <ExchangeFormComponent {...props} />
      );

      expect(container).not.toBeNull();

      expect(getByText('OTN.BTC')).not.toBeNull();
      expect(getByText('OTN')).not.toBeNull();

      expect(getByText('Bitcoin Tokenized')).not.toBeNull();
      expect(getByText('Open Trading Network')).not.toBeNull();

      expect(getAllByText('wallet-asset.svg')).toHaveLength(2);

      expect(getByText('Available 9.9999 OTN')).not.toBeNull();
      expect(getByText('Available 0.1 OTN.BTC')).not.toBeNull();

      expect(
        getByText('You will receive at least this amount.')
      ).not.toBeNull();
      expect(getByText('Price 4000 OTN = 1 BTC'));

      expect(getByText('Fee')).not.toBeNull();
      expect(getByText('-')).not.toBeNull();

      expect(getByText('exchange-icon-blue.svg')).not.toBeNull();
    });

    describe('fee panel', () => {
      test('should render fee panel', () => {
        const props = getProps();

        const { container, getByText, getAllByText } = renderWithRedux(
          <ExchangeFormComponent
            {...props}
            fields={{
              ...props.fields,
              fromAmount: '1',
              toAmount: '0.00025'
            }}
          />
        );

        expect(container).not.toBeNull();

        expect(getByText('Fee')).not.toBeNull();
        expect(getByText('(0.01%)')).not.toBeNull();

        expect(getAllByText('otn-coin.svg')).toHaveLength(2);

        expect(getByText('0.0001 OTN')).not.toBeNull();
        expect(getByText('Pay OTN')).not.toBeNull();
      });

      test('should not render percentages for different assets', () => {
        const props = getProps();

        const { container, getByText, getAllByText } = renderWithRedux(
          <ExchangeFormComponent
            {...props}
            fields={{
              ...props.fields,
              fromAmount: '1',
              toAmount: '0.00025',
              toAsset: props.fields.fromAsset,
              fromAsset: props.fields.toAsset
            }}
          />
        );

        expect(container).not.toBeNull();

        expect(getByText('Fee')).not.toBeNull();
        expect(getByText('-')).not.toBeNull();

        expect(getAllByText('otn-coin.svg')).toHaveLength(2);

        expect(getByText('0.0001 OTN')).not.toBeNull();
        expect(getByText('Pay OTN')).not.toBeNull();
      });
    });

    describe('validation', () => {
      test('from amount validation', () => {
        const props = getProps();

        const { container, getByText } = renderWithRedux(
          <ExchangeFormComponent
            {...props}
            fields={{
              ...props.fields,
              fromAmount: 'Incorrect value'
            }}
            validation={{
              fromAmount: 'From Amount Error',
              invalid: true
            }}
          />
        );

        expect(container).not.toBeNull();

        expect(getByText('From Amount Error')).not.toBeNull();
      });

      test('to amount validation', () => {
        const props = getProps();

        const { container, getByText } = renderWithRedux(
          <ExchangeFormComponent
            {...props}
            fields={{
              ...props.fields,
              toAmount: 'Incorrect value'
            }}
            validation={{
              toAmount: 'To Amount Error',
              invalid: true
            }}
          />
        );

        expect(container).not.toBeNull();

        expect(getByText('To Amount Error')).not.toBeNull();
      });
    });

    test('price is not available', () => {
      const props = getProps();

      const { container, getByText } = renderWithRedux(
        <ExchangeFormComponent
          {...props}
          data={{
            ...props.data,
            priceMeta: {
              price: null,
              isAvailable: false
            }
          }}
        />
      );

      expect(container).not.toBeNull();

      expect(getByText('Price Temporarily Unavailable')).not.toBeNull();
    });

    test('fee is loading', () => {
      const props = getProps();

      const { container, getByText } = renderWithRedux(
        <ExchangeFormComponent
          {...props}
          data={{
            ...props.data,
            fee: {
              ...props.data.fee,
              isLoading: true
            }
          }}
        />,
        {
          translation: {
            language: 'en'
          }
        }
      );

      expect(container).not.toBeNull();

      expect(getByText('Fee')).not.toBeNull();
      expect(getByText('spinner.svg')).not.toBeNull();
    });
  });

  describe('logic', () => {
    test('Max label', () => {
      const props = getProps();

      const { container, getAllByText } = renderWithRedux(
        <ExchangeFormComponent
          {...props}
          fields={{
            ...props.fields,
            fromAmount: '1',
            toAmount: '0.00025'
          }}
        />
      );

      expect(container).not.toBeNull();

      const [fromMax, toMax] = getAllByText('Max');

      fireEvent.click(fromMax);
      fireEvent.click(toMax);

      expect(props.onMaxClick).toBeCalledTimes(2);
    });

    describe('Exchange assets', () => {
      test('Enabled', () => {
        const props = getProps();

        const { container, getByText } = renderWithRedux(
          <ExchangeFormComponent
            {...props}
            fields={{
              ...props.fields,
              fromAmount: '1',
              toAmount: '0.00025'
            }}
          />
        );

        expect(container).not.toBeNull();

        const exchangeButton = getByText('exchange-icon-blue.svg');
        fireEvent.click(exchangeButton);

        expect(props.onExchangeAssets).toBeCalled();
      });

      test('disabled', () => {
        const props = getProps();

        const btc = props.data.availableBalances.find(
          asset => asset.name === 'BTC'
        );

        const { container, getByText } = renderWithRedux(
          <ExchangeFormComponent
            {...props}
            fields={{
              ...props.fields,
              toAsset: { ...btc, amount: 0 }
            }}
          />
        );

        expect(container).not.toBeNull();

        const exchangeButton = getByText('exchange-icon-blue.svg');
        fireEvent.click(exchangeButton);

        expect(props.onExchangeAssets).not.toBeCalled();
      });
    });

    test('from value change', () => {
      const props = getProps();

      const { container, getAllByPlaceholderText } = renderWithRedux(
        <ExchangeFormComponent {...props} />
      );

      expect(container).not.toBeNull();

      const [input] = getAllByPlaceholderText('Enter Amount');
      input.value = '1';
      fireEvent.change(input);

      expect(props.onFromAmountChange).toBeCalledWith('1');
    });

    test('to value change', () => {
      const props = getProps();

      const { container, getAllByPlaceholderText } = renderWithRedux(
        <ExchangeFormComponent {...props} />
      );

      expect(container).not.toBeNull();

      const [, input] = getAllByPlaceholderText('Enter Amount');
      input.value = '1';
      fireEvent.change(input);

      expect(props.onToAmountChange).toBeCalledWith('1');
    });

    test('on from asset change', () => {
      const props = getProps();

      const { container, getByText } = renderWithRedux(
        <ExchangeFormComponent {...props} />
      );

      expect(container).not.toBeNull();

      mouseEvent.mouseDown(getByText('OTN'));
      mouseEvent.mouseDown(getByText('OTN.ETH'));

      expect(props.onFromAssetChange).toBeCalledWith(
        props.data.availableBalances.find(balance => balance.name === 'ETH')
      );
    });

    test('on to asset change', () => {
      const props = getProps();

      const { container, getByText } = renderWithRedux(
        <ExchangeFormComponent {...props} />
      );

      expect(container).not.toBeNull();

      mouseEvent.mouseDown(getByText('OTN.BTC'));
      mouseEvent.mouseDown(getByText('OTN.ETH'));

      expect(props.onToAssetChange).toBeCalledWith(
        props.data.availableBalances.find(balance => balance.name === 'ETH')
      );
    });

    describe('Submit form', () => {
      test('should submit', () => {
        const props = getProps();

        const { container, getByText } = renderWithRedux(
          <ExchangeFormComponent
            {...props}
            fields={{
              ...props.fields,
              fromAmount: '1',
              toAmount: '0.00025'
            }}
          />
        );

        expect(container).not.toBeNull();

        const button = getByText('Exchange');
        fireEvent.click(button);

        expect(props.onFormSubmit).toBeCalled();
      });

      describe('submit button is disabled', () => {
        const makeTest = props => {
          const { container, getByText } = renderWithRedux(
            <ExchangeFormComponent {...props} />
          );

          expect(container).not.toBeNull();

          const button = getByText('Exchange');
          fireEvent.click(button);

          expect(props.onFormSubmit).not.toBeCalled();
        };

        test('should not submit invalid state', () => {
          const props = getProps();

          makeTest({
            ...props,
            validation: {
              invalid: true
            }
          });
        });

        test('should not submit is loading fee', () => {
          const props = getProps();

          makeTest({
            ...props,
            data: {
              ...props.data,
              fee: {
                ...props.data.fee,
                isLoading: true
              }
            }
          });
        });

        test('should not submit when price is unavailable', () => {
          const props = getProps();

          makeTest({
            ...props,
            data: {
              ...props.data,
              priceMeta: {
                ...props.data.priceMeta,
                isAvailable: false
              }
            }
          });
        });
      });
    });
  });
});
