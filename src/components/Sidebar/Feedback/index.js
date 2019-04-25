import React from 'react';

import { getVersion } from 'src/utils/env';
import config from 'src/utils/networkConfig';
import Url from 'elements/Url';
import Translate from 'elements/Translate';

import cn from 'utils/bem';

import ExternalUrlIcon from 'icons/external-url.svg';
import FeedbackSmallIcon from 'icons/feedback-small.svg';

import { propTypes } from './props';

import './style.styl';

const b = cn('sidebar-feedback');

const SidebarFeedback = ({ small }) => (
  <div className={b()}>
    <Url
      className={b('url', { small })}
      link={config.get('app.feedbackUrl')}
      isNative={true}
      newTab={true}
    >
      {small ? (
        <FeedbackSmallIcon className={b('url-icon', 'small')} />
      ) : (
        <React.Fragment>
          <Translate path="component.Sidebar.feedback" className={b('text')} />
          <ExternalUrlIcon className={b('url-icon')} />
        </React.Fragment>
      )}
    </Url>
    {!small && (
      <span className={b('version', { small })}>v. {getVersion()}</span>
    )}
  </div>
);

SidebarFeedback.propTypes = propTypes;

export default SidebarFeedback;
