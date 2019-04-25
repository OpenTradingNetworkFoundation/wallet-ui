import React from 'react';
import PropTypes from 'prop-types';

import cn from 'utils/bem';

import OTNIcon from 'icons/otn-icon.svg';

import './OTNLogo.styl';

const APP_NAME = 'OTN WALLET';

const b = cn('otn-logo');

class OTNLogo extends React.Component {
  static propTypes = {
    className: PropTypes.string
  };

  render() {
    const { className } = this.props;

    return (
      <div className={b(null, null, className)}>
        <OTNIcon className={b('icon')} />
        <div className={b('app-name')}>{APP_NAME}</div>
      </div>
    );
  }
}

export default OTNLogo;
