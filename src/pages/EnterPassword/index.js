import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Input from 'elements/Input';
import Button from 'elements/Button';
import Modal from 'elements/Modal';
import withRouter from 'hocs/withRouter';

import { loginActions } from 'ducks/login';
import { accountSelectors } from 'ducks/account';

import URL from 'enums/url';
import cn from 'utils/bem';
import localizer from 'utils/localizer';

import LockIcon from 'icons/lock.svg';

import Icon from './_images/lock2.svg';

import { propTypes } from './props';
import './style.styl';

const b = cn('enter-password');

class EnterPassword extends React.Component {
  static propTypes = propTypes;

  state = {
    password: ''
  };

  onClose = () => {
    const { routerActions, location } = this.props;

    if (!location || !location.from) {
      routerActions.navigate({ pathname: URL.ROOT });
      return;
    }

    routerActions.back();
  };

  onSubmit = () => {
    const { password } = this.state;
    const { loginActions, account } = this.props;

    loginActions.loginRequest({ login: account.name, password });
  };

  onChange = password => {
    this.setState({
      password
    });
  };

  render() {
    const { password } = this.state;
    const { error, isFetching } = this.props.login;

    return (
      <Modal className={b()} isOpen onClose={this.onClose}>
        <div className={b('content')}>
          <div className={b('icon-wrapper')}>
            <Icon className={b('icon')} />
          </div>
          <div className={b('title')}>
            {localizer.getValue('page.enterPassword.title')}
          </div>
          <div className={b('text')}>
            {localizer.getValue('page.enterPassword.text')}
          </div>
          <div className={b('input-wrapper')}>
            <Input
              shouldBeFocused={true}
              Icon={LockIcon}
              error={error ? error.message : ''}
              placeholder="Password"
              type="password"
              mods={['white']}
              className={b('input')}
              value={password}
              onChange={this.onChange}
            />
          </div>
          <div className={b('button-wrapper')}>
            <Button
              label={localizer.getValue('common.confirm')}
              disabled={!password.length}
              isLoading={isFetching}
              onClick={this.onSubmit}
              className={b('button')}
              mods="light"
            />
          </div>
        </div>
      </Modal>
    );
  }
}

function mapStateToProp(state) {
  return {
    login: state.login,
    account: accountSelectors.account(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginActions: bindActionCreators(loginActions, dispatch)
  };
}

export default connect(mapStateToProp, mapDispatchToProps)(
  withRouter(EnterPassword)
);
