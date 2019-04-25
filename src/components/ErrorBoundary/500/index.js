import React from 'react';

import Translate from 'elements/Translate';

import cn from 'utils/bem';

import OtnIcon from 'icons/otn-icon.svg';
import BtcSmallIcon from 'icons/btc-small-icon.svg';
import Universe from 'icons/universe.svg';

import { propTypes } from './props';
import './style.styl';

const b = cn('error-500');

const Error500 = props => (
  <section className={b()}>
    <section className={b('content')}>
      <figure className={b('spinner')}>
        <div className={b('spinner-border')}>
          <BtcSmallIcon />
        </div>
        <OtnIcon className={b('spinner-content')} />
      </figure>
      <h1 className={b('status')}>
        {props.renderStatus ? (
          props.renderStatus()
        ) : (
          <Translate path="component.ErrorBoundary.500.status" />
        )}
      </h1>
      <header className={b('header')}>
        {props.renderTitle ? (
          props.renderTitle()
        ) : (
          <Translate path="component.ErrorBoundary.500.title" />
        )}
      </header>
      <p className={b('description')}>
        {props.renderDescription ? (
          props.renderDescription()
        ) : (
          <Translate path="component.ErrorBoundary.500.description" />
        )}
      </p>
    </section>
    <section className={b('background')}>
      <Universe />
    </section>
  </section>
);

Error500.propTypes = propTypes;

export default Error500;
