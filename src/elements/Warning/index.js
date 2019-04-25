import React from 'react';

import cn from 'utils/bem';

import WarningIcon from 'icons/warning.svg';

import { propTypes } from './props';
import './style.styl';

const b = cn('warning');

class Warning extends React.Component {
  static propTypes = propTypes;

  render() {
    const { className, children } = this.props;

    return (
      <div className={b(null, null, className)}>
        <WarningIcon className={b('icon')} />
        <span className={b('text')}>
          {React.Children.toArray(children)
            .filter(Boolean)
            .map((content, index) => (
              <p key={index} className={b('row')}>
                {content}
              </p>
            ))}
        </span>
      </div>
    );
  }
}

export default Warning;
