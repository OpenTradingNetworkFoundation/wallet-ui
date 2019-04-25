import React from 'react';
import PropTypes from 'prop-types';

import cn from 'utils/bem';

import './InlineLabel.styl';

const b = cn('inline-label');

class InlineLabel extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.string
  };

  render() {
    const { className, label } = this.props;

    return <span className={b(null, null, className)}>{label}</span>;
  }
}

export default InlineLabel;
