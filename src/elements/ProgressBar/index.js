import React from 'react';
import PropTypes from 'prop-types';

import { Bar, Container } from './styled';

const ProgressBar = ({ progress }) => (
  <Container>
    <Bar />
    <Bar progress={progress} />
  </Container>
);

ProgressBar.propTypes = {
  progress: PropTypes.number
};

export default ProgressBar;
