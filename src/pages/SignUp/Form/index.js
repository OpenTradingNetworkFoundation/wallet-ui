import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get } from 'lodash';

import { signUpActions } from 'ducks/sign-up';

import OTNLogo from 'elements/OTNLogo';
import Button from 'elements/Button';
import Url from 'elements/Url';
import InputValidator from 'elements/InputValidator';
import Translate from 'elements/Translate';
import InlineLabel from 'elements/InlineLabel';
import cn from 'utils/bem';
import localizer from 'utils/localizer';
import translate from 'services/translate';

import UserIcon from 'icons/user.svg';

import validate from './validate';
import Tooltip from './Tooltip';

import './style.styl';

const b = cn('sign-up-form');

const generatePlaceholder = () => {
  const availableNames = localizer.getValue('page.signUp.placeholderNames');
  const index = Math.floor(Math.random() * availableNames.length);
  const example = availableNames[index];

  return translate('page.signUp.loginPlaceholder', { example });
};

class SignUpForm extends React.Component {
  static propTypes = {
    signUp: PropTypes.object,
    signUpActions: PropTypes.object
  };

  state = { accountName: '', placeholder: generatePlaceholder() };

  onLoginInputChange = value => {
    this._updateInputValue('accountName', value);

    const { update } = this.props.signUpActions;
    update({ error: null });
  };

  _updateInputValue(inputKey, value) {
    this.setState({
      ...this.state,
      [inputKey]: value
    });
  }

  onSignUpButtonClick = () => {
    const { accountName } = this.state;

    const { createAccount } = this.props.signUpActions;
    createAccount({ login: accountName });
  };

  get formState() {
    const fields = { ...this.state };
    const { error } = this.props.signUp;

    const validation = validate(fields, {
      external: {
        accountName: get(error, 'message', null)
      }
    });

    return {
      fields,
      validation,
      meta: {
        isButtonDisabled: !!validation.invalid,
        placeholder: this.state.placeholder
      }
    };
  }

  render() {
    const {
      fields: { accountName },
      validation: { accountName: accountNameValidation },
      meta: { isButtonDisabled, placeholder: accountNamePlaceholder }
    } = this.formState;

    const { isFetching } = this.props.signUp;
    return (
      <div className={b()}>
        <div className="sign-up-form-container">
          <OTNLogo className={b('logo')} />
          <div className={b('input-block')}>
            <div className={b('input-wrapper')}>
              <InputValidator
                Icon={UserIcon}
                error={accountNameValidation}
                placeholder={accountNamePlaceholder}
                value={accountName}
                onChange={this.onLoginInputChange}
                className={b('input')}
                mods={['dark']}
              />

              <Tooltip />
            </div>

            <InlineLabel
              label={localizer.getValue('page.signUp.passwordLabel')}
              className={b('input-label')}
            />
          </div>

          <div className={b('footer')}>
            <Button
              label={localizer.getValue('page.signUp.signUpLabel')}
              mods="dark"
              isLoading={isFetching}
              disabled={isButtonDisabled}
              onClick={this.onSignUpButtonClick}
            />
            <Url link="/" className={b('login-url')}>
              <Translate path="page.signUp.loginLabel" />
            </Url>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProp(state) {
  return {
    signUp: state.signUp
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signUpActions: {
      update: bindActionCreators(signUpActions.signUpUpdate, dispatch),
      createAccount: bindActionCreators(signUpActions.signUpRequest, dispatch)
    }
  };
}

export default connect(mapStateToProp, mapDispatchToProps)(SignUpForm);
