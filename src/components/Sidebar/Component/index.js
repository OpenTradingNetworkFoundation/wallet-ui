import React from 'react';

import NavigationBar from 'components/NavigationBar';
import UserAvatar from 'elements/UserAvatar';
import cn from 'utils/bem';

import SidebarLogo from '../Logo';
import SidebarFeedback from '../Feedback';

import { propTypes } from './props';

import './style.styl';

const b = cn('sidebar');

const SidebarComponent = ({ accountName, small, hidden, id }) => (
  <div
    data-testid={`sidebar-container-${id}`}
    className={b(null, { small, hidden })}
  >
    <div data-testid="sidebar-content" className={b('content', { hidden })}>
      <SidebarLogo small={small} />
      <NavigationBar
        small={small}
        className={b('navigation')}
        hidden={hidden}
      />
      <UserAvatar
        small={small}
        className={b('user-avatar')}
        username={accountName}
      />
      <SidebarFeedback small={small} />
    </div>
  </div>
);

SidebarComponent.propTypes = propTypes;

export default SidebarComponent;
