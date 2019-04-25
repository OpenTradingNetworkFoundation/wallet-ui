import React from 'react';

import Input from 'elements/Input';

import { propTypes } from './props';

class InputValidator extends React.Component {
  static propTypes = propTypes;

  state = {
    focus: false,
    changed: false
  };

  getStatus = () => {
    const { value } = this.props;

    return {
      ...this.state,
      dirty: Boolean(value)
    };
  };

  onChange = value => {
    const { onChange } = this.props;

    this.setState({ ...this.state, changed: true });
    onChange(value);
  };

  onFocus = () => {
    this.setState({ ...this.state, focus: true });
    this.props.onFocus && this.props.onFocus();
  };

  onBlur = () => {
    this.setState({ ...this.state, focus: false });
  };

  render() {
    const props = this.props;
    const { error } = props;

    const { dirty, focus, changed } = this.getStatus();

    const showError = error && ((focus && changed) || (dirty && !focus));

    return (
      <Input
        {...props}
        onChange={this.onChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        error={showError ? error : null}
      />
    );
  }
}

export default InputValidator;
