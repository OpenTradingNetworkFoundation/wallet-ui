import React from 'react';

import cn from 'utils/bem';

import { propTypes } from './props';

import './style.styl';

const b = cn('text-area');

class TextArea extends React.PureComponent {
  static propTypes = propTypes;

  onChange = e => {
    const { onChange } = this.props;
    onChange && onChange(e.target.value);
  };

  render() {
    const { className, value, disabled, placeholder, maxLength } = this.props;

    return (
      <div className={b(null, null, className)}>
        <textarea
          placeholder={placeholder}
          disabled={disabled}
          className={b('textarea')}
          value={value}
          maxLength={maxLength}
          onChange={this.onChange}
        />
        <div className={b('border')} />
      </div>
    );
  }
}

export default TextArea;
