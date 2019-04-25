import React from 'react';
import PropTypes from 'prop-types';

import Favorite from 'icons/favorite.svg';
import FavoriteActive from 'icons/favorite-active.svg';

import { Mark } from './styled';

const MarkAsFavorite = ({ marked, handleClick }) => (
  <Mark onClick={handleClick}>
    {marked ? <FavoriteActive /> : <Favorite />}
  </Mark>
);

MarkAsFavorite.propTypes = {
  marked: PropTypes.bool,

  handleClick: PropTypes.func
};

export default MarkAsFavorite;
