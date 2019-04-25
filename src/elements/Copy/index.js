import React from 'react';
import PropTypes from 'prop-types';

import cn from 'utils/bem';
import ClipboardSaver from 'utils/ClipboardSaver';
import Translate from 'elements/Translate';

import CopyIcon from 'icons/copy.svg';

import './style.styl';

const b = cn('copy');

class Copy extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    path: PropTypes.string,

    className: PropTypes.string
  };

  static defaultProps = {
    path: 'common.copy'
  };

  onClick = e => {
    const { value } = this.props;
    const saver = new ClipboardSaver(value, e);
    saver.copy();
  };

  render() {
    const { className, path } = this.props;

    return (
      <div className={b(null, null, className)} onClick={this.onClick}>
        <CopyIcon className={b('icon')} />
        <Translate path={path} />
      </div>
    );
  }
}

export default Copy;
