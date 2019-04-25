import React from 'react';
import { cleanup } from 'react-testing-library';

import { renderWithRedux } from 'src/__utils__';

import QueryParams from '../index';

// eslint-disable-next-line
const ParamsDisplay = ({ params }) => (
  <ul>
    {Object.keys(params).map(key => (
      <li key={key}>
        <span>{`${key}=${params[key]}`}</span>
      </li>
    ))}
  </ul>
);

describe('<QueryParams />', () => {
  afterEach(cleanup);

  test('renders', () => {
    const { getByText } = renderWithRedux(
      <QueryParams
        params={{ asset: { values: ['OTN', 'BTC', 'ETH'], default: 'OTN' } }}
        render={params => <ParamsDisplay params={params} />}
      />
    );

    expect(getByText('asset=OTN')).not.toBeNull();
  });

  test('strips default from location', () => {
    const { getByText, history } = renderWithRedux(
      <QueryParams
        params={{ asset: { values: ['OTN', 'BTC', 'ETH'], default: 'BTC' } }}
        render={params => <ParamsDisplay params={params} />}
      />,
      {
        router: {
          location: {
            search: '?asset=BTC'
          },
          action: 'PUSH'
        }
      }
    );

    expect(history.location.search).not.toContain('BTC');
    expect(history.location.search).toBe('');
    expect(getByText('asset=BTC')).not.toBeNull();
  });

  test('fallbacks to default and strips it from location if provided incorrect location search', () => {
    const { getByText, history } = renderWithRedux(
      <QueryParams
        params={{ asset: { values: ['OTN', 'BTC', 'ETH'], default: 'BTC' } }}
        render={params => <ParamsDisplay params={params} />}
      />,
      {
        router: {
          location: {
            search: '?asset=123'
          },
          action: 'PUSH'
        }
      }
    );
    expect(history.location.search).not.toContain('BTC');
    expect(history.location.search).toBe('');
    expect(getByText('asset=BTC')).not.toBeNull();
  });

  describe('validates params given a function to values', () => {
    test('given matching value', () => {
      const validator = value => value && value.match(/[a-zA-Z]/);

      const { getByText, history } = renderWithRedux(
        <QueryParams
          params={{ accountName: { validator, default: '' } }}
          render={params => <ParamsDisplay params={params} />}
        />,
        {
          router: { location: { search: '?accountName=misha' }, action: 'PUSH' }
        }
      );

      expect(history.location.search).toContain('accountName=misha');
      expect(getByText('accountName=misha')).not.toBeNull();
    });

    test('given not matching value', () => {
      const validator = value => value && value.match(/[a-zA-Z]/);

      const { getByText, queryByText, history } = renderWithRedux(
        <QueryParams
          params={{
            accountName: { validator, default: '' },
            nextValue: { values: ['1', '2', '3'], default: '1' }
          }}
          render={params => <ParamsDisplay params={params} />}
        />,
        {
          router: {
            location: { search: '?accountName=123&&nextValue=2' },
            action: 'PUSH'
          }
        }
      );

      expect(history.location.search).not.toContain('accountName=123');
      expect(history.location.search).toContain('nextValue=2');
      expect(queryByText('accountName=123')).toBeNull();
      expect(getByText('nextValue=2')).not.toBeNull();
    });
  });
});
