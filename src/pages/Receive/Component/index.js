import React from 'react';
import QRCode from 'qrcode.react';

import cn from 'utils/bem';
import Translate from 'elements/Translate';

import { propTypes } from './props';

import './style.styl';

const b = cn('receive-content');

const ReceiveContent = ({ queryParams: { asset }, accountName }) => (
  <div className={b()}>
    <div className={b('info')}>
      <Translate className={b('title')} path="page.receive.title" />
      <span className={b('username')}>{accountName}</span>
      <Translate
        className={b('description')}
        path="page.receive.description"
        params={{ asset }}
      />
    </div>

    <div className={b('qr-code')}>
      <QRCode value={accountName} renderAs="svg" />
    </div>
  </div>
);

ReceiveContent.propTypes = propTypes;

export default ReceiveContent;
