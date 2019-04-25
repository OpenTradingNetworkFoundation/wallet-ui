import React from 'react';

import Spinner from 'elements/Spinner';
import cn from 'utils/bem';

import { propTypes } from './props';
import './Button.styl';

const b = cn('button');

class Button extends React.Component {
  static propTypes = propTypes;

  render() {
    const {
      className,
      label,
      onClick,
      disabled = false,
      isLoading,
      mods = 'default'
    } = this.props;

    return (
      <button
        disabled={disabled}
        className={b(null, [{ disabled }].concat(mods), className)}
        onClick={onClick}
      >
        {isLoading ? <Spinner className={b('spinner')} /> : null}
        <span className={b('label', { isLoading })}>{label}</span>
      </button>
    );
  }
}

export default Button;
