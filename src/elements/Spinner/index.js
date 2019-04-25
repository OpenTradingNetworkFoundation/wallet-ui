import React from 'react';
import PropTypes from 'prop-types';

import cn from 'utils/bem';

import './style.styl';

const b = cn('spinner');

import SpinnerIcon from 'icons/spinner.svg';

class Spinner extends React.Component {
  static propTypes = {
    className: PropTypes.string
  };

  render() {
    const { className } = this.props;

    return (
      <div className={b(null, null, className)}>
        <SpinnerIcon className={b('icon')} />
      </div>
    );
  }
}

export default Spinner;
