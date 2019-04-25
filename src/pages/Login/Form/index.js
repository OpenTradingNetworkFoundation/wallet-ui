import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get } from 'lodash';

import { loginActions } from 'ducks/login';
import { routerSelectors } from 'ducks/router';

import OTNLogo from 'elements/OTNLogo';
import Button from 'elements/Button';
import Url from 'elements/Url';
import Input from 'elements/Input';
import Translate from 'elements/Translate';

import cn from 'utils/bem';

import LockIcon from 'icons/lock.svg';
import UserIcon from 'icons/user.svg';
import translate from 'services/translate';

import { propTypes } from './props';
import './style.styl';

const b = cn('login-form');

class LoginForm extends React.Component {
  static propTypes = propTypes;

  state = {
    login: '',
    password: '',
    isDefault: true
  };

  static getDerivedStateFromProps(props, state) {
    if (props.queryParams.accountName && state.isDefault) {
      return {
        login: props.queryParams.accountName,
        isDefault: false
      };
    }

    return null;
  }

  componentWillUnmount() {
    this.props.loginActions.loginRequestFailure(null);
  }

  onLoginButtonClick = () => {
    const state = this.state;
    const { login, password } = state;

    const { loginRequest } = this.props.loginActions;
    loginRequest({ login, password });
  };

  onLoginInputChange = value => {
    this.updateInputValue('login', value);
  };

  onPasswordInputChange = value => {
    this.updateInputValue('password', value);
  };

  updateInputValue(inputKey, value) {
    const state = this.state;
    this.setState({
      ...state,
      [inputKey]: value
    });
  }

  get isButtonDisabled() {
    const state = this.state;
    const { login, password } = state;

    return !(login && password);
  }

  render() {
    const { login, password } = this.state;
    const props = this.props;
    const { error, isFetching } = props.login;
    const isLoginError = get(error, 'field') === 'login';
    const isPasswordError = !!(error && !isLoginError);

    return (
      <div className={b()}>
        <div className="login-form-container">
          <OTNLogo className={b('logo')} />
          <div className={b('input-block')}>
            <Input
              Icon={UserIcon}
              error={isLoginError ? error.message : ''}
              placeholder="Login"
              className={b('input')}
              mods={['dark']}
              shouldBeFocused={true}
              value={login}
              onChange={this.onLoginInputChange}
            />

            <Input
              Icon={LockIcon}
              error={isPasswordError ? error.message : ''}
              placeholder="Password"
              type="password"
              className={b('input')}
              mods={['dark']}
              value={password}
              onChange={this.onPasswordInputChange}
            />
          </div>

          <div className={b('footer')}>
            <Button
              label={translate('page.signUp.loginLabel')}
              disabled={this.isButtonDisabled}
              mods="dark"
              isLoading={isFetching}
              onClick={this.onLoginButtonClick}
            />
            <Url link="/signup" className={b('sign-up')}>
              <Translate path="page.signUp.signUpLabel" />
            </Url>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    login: state.login,
    queryParams: routerSelectors.queryParams(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginActions: bindActionCreators(loginActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
