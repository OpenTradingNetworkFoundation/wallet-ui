import React from 'react';

import cn from 'utils/bem';
import withRouter from 'hocs/withRouter';

import URL from 'enums/url';

import Button from 'elements/Button';
import Translate from 'elements/Translate';
import Modal from 'elements/Modal';

import translate from 'services/translate';

import DeathStar from 'icons/death-star.svg';
import Glowing from 'icons/glowing.svg';
import Universe from 'icons/universe.svg';

import './style.styl';

const b = cn('error-gateway');

const navigateToWallet = props => {
  const { routerActions, location } = props;
  routerActions.navigate({ pathname: URL.WALLET, from: location });
};

const ErrorGateway = props => (
  <Modal isOpen onClose={() => navigateToWallet(props)}>
    <section className={b()}>
      <section className={b('content')}>
        <figure className={b('spinner')}>
          <div className={b('spinner-content')}>
            <DeathStar className={b('death-star')} />
            <Glowing className={b('glowing')} />
          </div>
        </figure>
        <h1 className={b('status')}>
          <Translate path="component.ErrorBoundary.Gateway.status" />
        </h1>
        <p className={b('description')}>
          <Translate path="component.ErrorBoundary.Gateway.description" />
        </p>
        <Button
          label={translate('component.ErrorBoundary.Gateway.buttonLabel')}
          mods="light"
          className={b('button')}
          onClick={() => navigateToWallet(props)}
        />
      </section>
      <section className={b('background')}>
        <Universe />
      </section>
    </section>
  </Modal>
);

export default withRouter(ErrorGateway);
