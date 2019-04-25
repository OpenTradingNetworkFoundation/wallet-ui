import React from 'react';
import PropTypes from 'prop-types';

import AssetIcon from 'elements/AssetIcon';

import { Container } from './styled';

const CurrencyIcons = ({ base, quote }) => (
  <Container>
    <AssetIcon assetName={base} />
    <AssetIcon assetName={quote} />
  </Container>
);

CurrencyIcons.propTypes = {
  base: PropTypes.string,
  quote: PropTypes.string
};

export default CurrencyIcons;
