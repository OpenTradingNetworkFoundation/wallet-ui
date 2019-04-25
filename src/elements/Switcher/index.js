import React from 'react';

import cn from 'utils/bem';
import Translate from 'elements/Translate';

import { propTypes, defaultProps } from './props';

import './style.styl';

const b = cn('switcher');

class Switcher extends React.PureComponent {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  onChange = () => {
    const { onChange, active } = this.props;

    onChange(!active);
  };

  render() {
    const { className, mods, active } = this.props;

    return (
      <label className={b(null, mods, className)} data-testid="switcher-label">
        <input
          type="checkbox"
          className={b('input')}
          onChange={this.onChange}
          data-testid="switcher-input"
        />
        <Translate
          path="elements.Switcher.light"
          className={b('button', { left: true, active: !active })}
          dataTestId="switcher-button-left"
        />
        <Translate
          path="elements.Switcher.pro"
          className={b('button', { right: true, active })}
          dataTestId="switcher-button-right"
        />
        <span
          data-testid="switcher-selector"
          className={b('selector', [].concat([mods, { right: active }]))}
        />
      </label>
    );
  }
}

export default Switcher;
