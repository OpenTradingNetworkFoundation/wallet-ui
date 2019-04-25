import React from 'react';
import cn from 'utils/bem';

import CloseIcon from 'icons/close.svg';

import { propTypes, defaultProps } from './props';
import './style.styl';

const b = cn('modal');

class Modal extends React.Component {
  static propTypes = propTypes;

  static defaultProps = defaultProps;

  state = {
    closing: false,
    opening: false
  };

  componentDidMount() {
    setTimeout(
      () =>
        this.setState({
          opening: true
        }),
      this.props.fadeOutDelay
    );
  }

  handleClose = () => {
    this.setState({
      closing: true
    });

    this.timeoutId = setTimeout(this.props.onClose, this.props.fadeOutDelay);
  };

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  render() {
    const { HeaderContent, className, isOpen } = this.props;
    const { closing, opening } = this.state;

    return isOpen ? (
      <div className={b(null, { closing, opening })}>
        <div className={b('content', null, className)}>
          <div className={b('header', { empty: !HeaderContent })}>
            <div className={b('header-content')}>
              {HeaderContent && <HeaderContent />}
            </div>
            <CloseIcon className={b('close-icon')} onClick={this.handleClose} />
          </div>
          <div className={b('body')}>{this.props.children}</div>
        </div>
      </div>
    ) : null;
  }
}

export default Modal;
