import React from 'react';
import { compose } from 'ramda';

import NAV_URLS from 'enums/nav-urls';
import URL from 'enums/url';
import withActiveNavUrl from 'hocs/withActiveNavUrl';
import Url from 'elements/Url';
import cn from 'utils/bem';
import Translate from 'elements/Translate';
import { Consumer } from 'src/providers/VestingBalances';

import './style.styl';
import { propTypes } from './props';

const b = cn('navigation-bar');

class NavigationBar extends React.Component {
  static propTypes = propTypes;
  state = { hasVestingBalances: false };

  render() {
    const { activeUrlName, className, small, hidden } = this.props;

    const items = NAV_URLS.filter(
      url =>
        this.props.hasVestingBalances ? true : url.url !== URL.VESTING_BALANCES
    ).map(link => {
      const active = link.name === activeUrlName;
      const Icon = link.icon;

      return (
        <li key={link.name} className={b('element', { active })}>
          <Url className={b('wrapper', { small })} link={link.url}>
            <Icon className={b('icon')} />
            {!small && (
              <div className={b('content')}>
                <Translate
                  className={b('title')}
                  path={`sidebar.${link.name}.title`}
                />
                <Translate
                  className={b('description', { hidden })}
                  path={`sidebar.${link.name}.description`}
                />
              </div>
            )}
          </Url>
        </li>
      );
    });

    return (
      <ul
        className={b(null, null, className)}
        data-testid="navigation-bar-container"
      >
        {items}
      </ul>
    );
  }
}

export default compose(withActiveNavUrl)(props => (
  <Consumer>
    {({ hasVestingBalances }) => (
      <NavigationBar {...props} hasVestingBalances={hasVestingBalances} />
    )}
  </Consumer>
));
