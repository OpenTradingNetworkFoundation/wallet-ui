import React from 'react';
import { cleanup, render } from 'react-testing-library';

import AssetProgressIcon from '../index';

describe('<AssetProgressIcon />', () => {
  afterEach(cleanup);

  describe('render', () => {
    test('tokenize operation', () => {
      const { container, queryByText } = render(
        <AssetProgressIcon operations={[{ internalType: 'tokenize' }]} />
      );

      expect(container).not.toBeNull();
      expect(queryByText(/pending-big.svg/i)).not.toBeNull();
      expect(queryByText(/tokenize.svg/i)).not.toBeNull();
    });

    test('detokenize operation', () => {
      const { container, queryByText } = render(
        <AssetProgressIcon operations={[{ internalType: 'detokenize' }]} />
      );

      expect(container).not.toBeNull();
      expect(queryByText(/pending-big.svg/i)).not.toBeNull();
      expect(queryByText(/detokenize.svg/i)).not.toBeNull();
    });

    test('some operations', () => {
      const { container, queryByText } = render(
        <AssetProgressIcon
          operations={[
            { internalType: 'detokenize' },
            { internalType: 'tokenize' }
          ]}
        />
      );

      expect(container).not.toBeNull();
      expect(queryByText(/pending-big.svg/i)).not.toBeNull();
      expect(queryByText(/2/i)).not.toBeNull();
    });
  });

  test('render with custom className', () => {
    const { container, queryByTestId } = render(
      <AssetProgressIcon
        operations={[{ internalType: 'detokenize' }]}
        className="test-class"
        id="progress-icon-ETH"
      />
    );

    expect(container).not.toBeNull();
    const div = queryByTestId('asset-progress-icon-progress-icon-ETH');

    expect(div).not.toBeNull();
    expect(div.className).toContain('test-class');
  });
});
