import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loginActions } from 'ducks/login';
import Url from 'elements/Url';
import cn from 'utils/bem';
import JDenticon from 'elements/JDenticon';
import Tooltip from 'elements/Tooltip';

import LogOutIcon from 'icons/logout.svg';

import { propTypes } from './props';

import './style.styl';

const b = cn('user-avatar');

class UserAvatar extends React.Component {
  static propTypes = propTypes;

  state = {
    isTruncated: false
  };

  usernameRef = React.createRef();

  logOut = () => {
    const { logout } = this.props.loginActions;
    logout();
  };

  componentDidMount() {
    this.checkTruncated();
  }

  checkTruncated = () => {
    const el = this.usernameRef.current;

    if (el) {
      const isTruncated = el.offsetWidth < el.scrollWidth;
      this.setState({ isTruncated });
    }
  };

  render() {
    const { username, className, small } = this.props;
    const isTruncated = this.state.isTruncated;

    return (
      <div
        className={b(null, { small }, className)}
        data-testid="user-avatar-container"
      >
        <JDenticon
          value={username}
          className={b('icon')}
          id="user-avatar-main-menu"
        />
        {!small && (
          <React.Fragment>
            {isTruncated ? (
              <Tooltip
                className={b('username')}
                contentClassName={b('tooltip-content')}
                mods={['dark']}
                renderTooltip={() => (
                  <span className={b('text', 'panel')}>{username}</span>
                )}
                renderTitle={() => (
                  <span className={b('text', 'tooltip')}>{username}</span>
                )}
              />
            ) : (
              <span className={b('username')} ref={this.usernameRef}>
                <span className={b('text', 'panel')}>{username}</span>
              </span>
            )}

            <Url className={b('logout-url')} onClick={this.logOut}>
              <LogOutIcon className={b('logout-icon')} />
            </Url>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default connect(null, dispatch => ({
  loginActions: bindActionCreators(loginActions, dispatch)
}))(UserAvatar);
