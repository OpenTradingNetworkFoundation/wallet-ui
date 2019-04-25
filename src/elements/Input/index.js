import React from 'react';
import { isFunction } from 'lodash';

import cn from 'utils/bem';
import InlineLabel from 'elements/InlineLabel';

import { propTypes, defaultProps } from './props';

import './style.styl';

const DEFAULT_TYPE = 'text';

const b = cn('input');

class Input extends React.Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  componentDidMount() {
    const { shouldBeFocused = false } = this.props;
    if (shouldBeFocused) {
      this.inputElement.focus();
    }
  }

  onChange = e => {
    const { onChange, mask, value: prevValue } = this.props;

    let value = e.target.value;
    if (mask) {
      value = isFunction(mask) ? mask(value) : value.replace(mask, '');
    }

    if (onChange && value !== prevValue) {
      onChange(value);
    }
  };

  render() {
    const {
      placeholder,
      type = DEFAULT_TYPE,
      error,
      Icon,
      value,
      onBlur,
      onFocus,
      className,
      mods,
      disabled,
      isActive
    } = this.props;

    const hasIcon = Boolean(Icon);

    return (
      <div className={b(null, null, className)}>
        <div className={b('textbox-wrapper')}>
          <input
            id={this.props.id}
            data-testid={this.props.dataTestId}
            ref={node => (this.inputElement = node)}
            onChange={this.onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            type={type}
            className={b('textbox', [
              ...mods,
              { disabled, error, hasIcon, isActive }
            ])}
            placeholder={placeholder}
            value={value}
            disabled={disabled}
          />

          {hasIcon ? (
            <Icon className={b('icon', [...mods, { error }])} />
          ) : null}
        </div>
        {error ? (
          <InlineLabel label={error} className={b('error-label')} />
        ) : null}
      </div>
    );
  }
}

export default Input;
