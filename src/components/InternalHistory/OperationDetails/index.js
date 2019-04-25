import React from 'react';

import Column from 'components/History/Operation/Layout/Column';
import Row from 'components/History/Operation/Layout/Row';
import Header from 'components/History/Operation/Layout/Header';
import Content from 'components/History/Operation/Layout/Content';
import Translate from 'elements/Translate';
import FeePercentage from 'src/elements/FeePercentage';
import Copy from 'src/elements/Copy';
import Tooltip from 'elements/Tooltip';

import translate from 'services/translate';
import { INTERNAL_TYPE, TYPE } from 'enums/operation';
import cn from 'utils/bem';

import QuestionIcon from 'icons/question.svg';

import { propTypes } from './props';

import './style.styl';

const b = cn('internal-operation-details');

const getConfirmationPath = isIrreversible =>
  `component.Operation.status.internal.${getConfirmationStatus(
    isIrreversible
  )}.label`;

const getConfirmationStatus = isIrreversible =>
  isIrreversible ? 'confirmed' : 'pending';

const OperationDetails = ({
  operation: {
    fee,
    amount,
    internalType,
    from,
    to,
    id,
    receives,
    pays,
    isIrreversible
  }
}) => (
  <div className={b()}>
    <Column>
      <Row>
        <Header className={b('status-header')}>
          <Translate path="component.Operation.status.label" />
          <Tooltip
            hideOnClick={false}
            contentClassName={b('tooltip-content')}
            mods={['white']}
            renderTooltip={() => (
              <QuestionIcon className={b('question-icon')} />
            )}
            renderTitle={() =>
              translate(
                `component.Operation.status.internal.${getConfirmationStatus(
                  isIrreversible
                )}.description`
              )
            }
            position="right"
          />
        </Header>
        <Content
          className={b('confirmations', getConfirmationStatus(isIrreversible))}
        >
          <div>
            <Translate
              path={getConfirmationPath(isIrreversible)}
              className={b('confirmation-status')}
            />
            <div className={b('line', getConfirmationStatus(isIrreversible))} />
          </div>
        </Content>
      </Row>
    </Column>

    <Column>
      <Row>
        <Header>
          <Translate path="component.Operation.operationId" />
        </Header>
        <Content>
          {id}
          <Copy value={id} path="common.empty" className={b('copy-icon')} />
        </Content>
      </Row>

      {[TYPE.SEND, TYPE.RECEIVE].includes(internalType) ? (
        <Row>
          <Header>
            <Translate
              path={`component.Operation.${
                internalType === TYPE.SEND ? 'sentTo' : 'receiveFrom'
              }`}
            />
          </Header>
          <Content>
            {internalType === TYPE.SEND ? to.name : from.name}
            <Copy
              value={internalType === TYPE.SEND ? to.name : from.name}
              path="common.empty"
              className={b('copy-icon')}
            />
          </Content>
        </Row>
      ) : null}

      {[INTERNAL_TYPE.EXCHANGE_IN, INTERNAL_TYPE.EXCHANGE_OUT].includes(
        internalType
      ) && (
        <Row>
          <Header>
            <Translate path="component.Operation.give" />
          </Header>
          <Content>
            {pays.amount} {pays.asset.displayName}
          </Content>
        </Row>
      )}
    </Column>

    <Column>
      <Row>
        <Header>
          <FeePercentage
            label={translate('component.Operation.fee')}
            percentage={fee.amount / amount.amount}
            showPercentage={fee.amount !== '0'}
            className={b('fee')}
          />
        </Header>
        <Content>
          {fee.amount} {fee.asset.displayName}
        </Content>
      </Row>

      {[INTERNAL_TYPE.EXCHANGE_IN, INTERNAL_TYPE.EXCHANGE_OUT].includes(
        internalType
      ) && (
        <Row>
          <Header>
            <Translate path="component.Operation.get" />
          </Header>
          <Content>
            {receives.amount} {receives.asset.displayName}
          </Content>
        </Row>
      )}
    </Column>
  </div>
);

OperationDetails.propTypes = propTypes;

export default OperationDetails;
