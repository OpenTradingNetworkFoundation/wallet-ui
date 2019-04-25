import React from 'react';

import cn from 'utils/bem';
import Translate from 'elements/Translate';

import WalletError from 'icons/wallet-error.svg';

import './style.styl';

const b = cn('error-node');

const ErrorNode = () => (
  <section className={b()}>
    <figure className={b('icon')}>
      <WalletError />
    </figure>
    <h1 className={b('status')}>
      <Translate path="component.ErrorBoundary.Node.status" />
    </h1>
    <header className={b('title')}>
      <Translate path="component.ErrorBoundary.Node.title" />
    </header>
    <p className={b('description')}>
      <Translate path="component.ErrorBoundary.Node.description" />
    </p>
  </section>
);

export default ErrorNode;
