import React from 'react';

import cn from 'utils/bem';
import URL from 'enums/url';
import translate from 'services/translate';

import Button from 'elements/Button';
import withRouter from 'hocs/withRouter';

import EmptyIcon from 'icons/empty.svg';

import { propTypes } from './props';
import './style.styl';

const b = cn('empty-placeholder');

class EmptyPlaceholder extends React.PureComponent {
  static propTypes = propTypes;

  render() {
    const { title, description, routerActions, location } = this.props;

    return (
      <div className={b()}>
        <EmptyIcon className={b('icon')} />
        <h3 className={b('title')}>{title}</h3>
        <p className={b('description')}>{description}</p>
        <Button
          className={b('action')}
          label={translate('component.Empty.goToWallet')}
          onClick={() => {
            routerActions.navigate({
              pathname: URL.WALLET,
              from: location.from
            });
          }}
          mods="light"
        />
      </div>
    );
  }
}

export default withRouter(EmptyPlaceholder);
