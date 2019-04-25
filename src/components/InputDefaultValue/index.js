import InputValidator from 'elements/InputValidator';
import React from 'react';

import cn from 'utils/bem';
import Url from 'elements/Url';

import { propTypes } from './props';

import './InputDefaultValue.styl';

const b = cn('input-default-value');

class InputDefaultValue extends React.Component {
  static propTypes = propTypes;

  onUrlClick = () => {
    const { inputProps: { onChange }, defaultValue } = this.props;
    onChange(defaultValue);
  };

  Label = () => {
    const { label, onLabelClick = this.onUrlClick, disabled } = this.props;

    return (
      <Url
        className={b('url', [{ disabled }])}
        isNative={true}
        onClick={onLabelClick}
      >
        {label}
      </Url>
    );
  };

  render() {
    const { inputProps, className, disabled } = this.props;
    const Label = this.Label;

    return (
      <div className={b(null, null, className)}>
        <InputValidator {...inputProps} disabled={disabled} />
        <Label />
      </div>
    );
  }
}

export default InputDefaultValue;
