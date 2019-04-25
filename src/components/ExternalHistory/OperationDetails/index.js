import React from 'react';

import Column from 'components/History/Operation/Layout/Column';
import Row from 'components/History/Operation/Layout/Row';
import Header from 'components/History/Operation/Layout/Header';
import Content from 'components/History/Operation/Layout/Content';
import Translate from 'elements/Translate';
import FeePercentage from 'src/elements/FeePercentage';
import Copy from 'src/elements/Copy';

import translate from 'services/translate';
import truncate from 'helpers/truncate';

import cn from 'utils/bem';

import { propTypes } from './props';

import './style.styl';

const b = cn('operation-details');

const DASH = '-';
const MAX_LENGTH = 20;

const getConfirmationPath = state =>
  `component.Operation.status.external.${
    state === 'done' ? 'confirmed' : state
  }.label`;

const notDefault = (value, element) => (value === DASH ? null : element);

const OperationDetails = ({
  operation: {
    confirmations = 0,
    fee,
    amount,
    externalTransactionId = DASH,
    internalTransactionId = DASH,
    externalAddress = DASH,
    internalState
  }
}) => (
  <div className={b()}>
    <Column>
      <Row>
        <Header>
          <Translate path="component.Operation.confirmations" />
        </Header>

        <Content className={b('confirmations', internalState)}>
          <div>
            <Translate
              path={getConfirmationPath(internalState)}
              className={b('confirmation-status')}
            />
            <div className={b('line', internalState)} />
          </div>
          <span className={b('confirmation-count', internalState)}>
            +{confirmations}
          </span>
        </Content>
      </Row>
    </Column>

    <Column>
      <Row>
        <Header>
          <Translate path="component.Operation.internalTransactionId" />
        </Header>
        <Content>
          <span>{truncate(internalTransactionId, MAX_LENGTH)}</span>
          {notDefault(
            internalTransactionId,
            <Copy
              value={internalTransactionId}
              path="common.empty"
              className={b('copy-icon')}
            />
          )}
        </Content>
      </Row>

      <Row>
        <Header>
          <Translate path="component.Operation.externalTransactionId" />
        </Header>
        <Content>
          <span>{truncate(externalTransactionId, MAX_LENGTH)}</span>
          {notDefault(
            externalTransactionId,
            <Copy
              value={externalTransactionId}
              path="common.empty"
              className={b('copy-icon')}
            />
          )}
        </Content>
      </Row>
    </Column>

    <Column>
      <Row>
        <Header>
          <FeePercentage
            label={translate('component.Operation.externalFee')}
            percentage={fee.amount / amount.amount}
            showPercentage={fee.amount !== '0'}
            className={b('fee')}
          />
        </Header>
        <Content>
          {fee.amount} {fee.asset.displayName}
        </Content>
      </Row>
      <Row>
        <Header>
          <Translate path="component.Operation.externalAddress" />
        </Header>
        <Content>
          <span>{truncate(externalAddress, MAX_LENGTH)}</span>
          {notDefault(
            externalAddress,
            <Copy
              value={externalAddress}
              path="common.empty"
              className={b('copy-icon')}
            />
          )}
        </Content>
      </Row>
    </Column>
  </div>
);

OperationDetails.propTypes = propTypes;

export default OperationDetails;
