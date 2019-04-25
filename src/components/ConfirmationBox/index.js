import React from 'react';

import cn from 'utils/bem';
import Button from 'elements/Button';
import translate from 'services/translate';

import { propTypes } from './props';

import './style.styl';

const b = cn('confirmation-box');

class ConfirmationBox extends React.Component {
  static propTypes = propTypes;

  render() {
    const { render, onBack, onConfirm, confirmButtonLabel } = this.props;

    return (
      <div className={b()}>
        <div className={b('content')}>{render()}</div>

        <div className={b('footer')}>
          <Button
            className={b('button', 'back')}
            mods="white"
            label={translate('component.ConfirmationBox.backLabel')}
            onClick={onBack}
          />

          <Button
            className={b('button', 'confirm')}
            mods="light"
            label={confirmButtonLabel}
            onClick={onConfirm}
          />
        </div>
      </div>
    );
  }
}

export default ConfirmationBox;
