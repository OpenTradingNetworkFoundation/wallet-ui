import React from 'react';

import cn from 'utils/bem';
import InputValidator from 'elements/InputValidator';
import Spinner from 'elements/Spinner';
import JDenticon from 'elements/JDenticon';

import { propTypes } from './props';

import './style.styl';

const b = cn('input-user-avatar');

class InputUserAvatar extends React.Component {
  static propTypes = propTypes;

  render() {
    const { inputProps, className, isLoading } = this.props;
    const { error, value } = inputProps;
    const showAvatar = !error && !isLoading && value;

    return (
      <div
        className={b(null, null, className)}
        data-testid="input-user-avatar-container"
      >
        <InputValidator dataTestId="input-user-avatar-input" {...inputProps} />
        {isLoading ? (
          <div className={b('loader', { error: Boolean(inputProps.error) })}>
            <Spinner className={b('spinner')} />
          </div>
        ) : (
          <div
            className={b('image-wrapper', { empty: !value })}
            data-testid="image-wrapper"
          >
            {showAvatar && (
              <JDenticon
                value={value}
                id="user-avatar-send"
                className={b('image')}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default InputUserAvatar;
