import React from 'react';

import cn from 'utils/bem';
import translate from 'services/translate';
import URL from 'enums/url';

import DetokenizeDisabled from 'icons/detokenize-disabled.svg';
import Button from 'elements/Button';
import Translate from 'elements/Translate';

import withRouter from 'hocs/withRouter';

import { propTypes } from './props';
import './style.styl';

const b = cn('detokenization-disabled');

const DetokenizationDisabled = ({ routerActions }) => (
  <div className={b()}>
    <DetokenizeDisabled className={b('icon')} />
    <h3 className={b('title')}>
      <Translate path="page.detokenize.disabledTitle" />
    </h3>
    <p className={b('description')}>
      <Translate path="page.detokenize.disabledDescription" />
    </p>
    <Button
      className={b('action')}
      label={translate('page.detokenize.disabledAction')}
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

DetokenizationDisabled.propTypes = propTypes;

export default withRouter(DetokenizationDisabled);
