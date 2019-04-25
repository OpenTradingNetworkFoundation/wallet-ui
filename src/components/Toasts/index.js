import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import cn from 'utils/bem';

import { toastSelectors, toastActions } from 'ducks/toast';

import CloseIcon from 'icons/close.svg';

import { propTypes } from './props';
import ToastContent from './ToastContent';

import './style.styl';

const b = cn('toasts');

class Toasts extends React.Component {
  static propTypes = propTypes;

  onFocus = () => {
    const { toastActions } = this.props;
    toastActions.focus();
  };

  onBlur = () => {
    const { toastActions } = this.props;
    toastActions.blur();
  };

  onClose = id => {
    const { toastActions } = this.props;
    toastActions.itemClose({ id });
  };

  render() {
    const { items } = this.props;

    return (
      <div
        className={b()}
        onMouseEnter={this.onFocus}
        onMouseLeave={this.onBlur}
      >
        {items.map(({ id, state, type, payload }) => (
          <div key={id} className={b('item', [state, type])}>
            <div className={b('item-header')}>
              <div className={b('item-title')}>{payload.title}</div>
              <CloseIcon
                className={b('item-close')}
                onClick={() => this.onClose(id)}
              />
            </div>
            <div className={b('item-content')}>
              <ToastContent payload={payload} />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

function mapStateToProp(state) {
  return {
    items: toastSelectors.getItems(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toastActions: {
      blur: bindActionCreators(toastActions.blur, dispatch),
      focus: bindActionCreators(toastActions.focus, dispatch),
      itemClose: bindActionCreators(toastActions.itemClose, dispatch)
    }
  };
}

export default connect(mapStateToProp, mapDispatchToProps)(Toasts);
