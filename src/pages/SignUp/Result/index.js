import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { get } from 'lodash';

import { signUpActions } from 'ducks/sign-up';
import ClipboardSaver from 'utils/ClipboardSaver';
import URL from 'enums/url';
import translate from 'services/translate';

import Button from 'elements/Button';
import OTNLogo from 'elements/OTNLogo';
import Translate from 'elements/Translate';
import Url from 'elements/Url';
import Warning from 'elements/Warning';
import withRouter from 'hocs/withRouter';

import LockIcon from 'icons/lock.svg';
import CopyIcon from 'icons/copy.svg';

import { propTypes } from './props';

import './style.styl';

class SignUpResult extends React.Component {
  static propTypes = propTypes;

  onButtonClick = () => {
    const { routerActions, location, signUp } = this.props;
    const { update } = this.props.signUpActions;

    update({ result: null });

    routerActions.navigate({
      pathname: URL.LOGIN,
      from: location,
      search: { accountName: signUp.result.login }
    });
  };

  onCopyClick = e => {
    const password = get(this.props, 'signUp.result.password', '');
    const saver = new ClipboardSaver(password, e);
    saver.copy();
  };

  render() {
    const password = get(this.props, 'signUp.result.password', '');

    return (
      <div className="sign-up-result">
        <OTNLogo className="sign-up-result__logo" />
        <div className="sign-up-result__container">
          <span className="sign-up-result__label">
            <LockIcon className="sign-up-result__lock-icon" />
            <Translate path="page.signUp.result.passwordLabel" />
          </span>
          <span className="sign-up-result__password">{password}</span>

          <Url className="sign-up-result__copy" onClick={this.onCopyClick}>
            <CopyIcon className="sign-up-result__copy-icon" />
            <Translate path="page.signUp.result.copyLabel" />
          </Url>

          <Warning className="sign-up-result__warning">
            <Translate path="page.signUp.result.passwordWarning" />
          </Warning>

          <Button
            label={translate('page.signUp.result.buttonLabel')}
            className="sign-up-result__confirm-button"
            mods="dark"
            onClick={this.onButtonClick}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    signUp: state.signUp
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signUpActions: {
      update: bindActionCreators(signUpActions.signUpUpdate, dispatch)
    }
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(SignUpResult);
