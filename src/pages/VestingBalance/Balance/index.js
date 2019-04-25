import React from 'react';
import PropTypes from 'prop-types';

import { parseAmount, roundAmount } from 'src/models/AssetAmount';
import translate from 'services/translate';

import Button from 'elements/Button';
import Translate from 'elements/Translate';
import AnimatedNumber from 'elements/AnimatedNumber';

import AvailableAmountIcon from 'icons/stack-of-coins.svg';
import AvailableWithdrawalIcon from 'icons/available-withdrawal.svg';

import {
  Balance,
  BalanceRow,
  DateTime,
  BlockHeader,
  Block,
  BlockContent,
  BlockIcon,
  BlockData
} from './styled';

class VestingBalanceItem extends React.Component {
  static propTypes = {
    balance: PropTypes.object.isRequired,
    precision: PropTypes.number,
    displayName: PropTypes.string,
    withdrawBalance: PropTypes.func.isRequired
  };

  state = {
    isProcessing: false
  };

  handleWithdraw = (balanceId, amount, assetId) => {
    this.setState({ isProcessing: true }, () => {
      this.props.withdrawBalance(balanceId, amount, assetId).finally(() => {
        this.setState({ isProcessing: false });
      });
    });
  };

  render() {
    const { isProcessing } = this.state;

    const { balance, precision, displayName } = this.props;

    return (
      <Balance>
        <BalanceRow>
          <Block>
            <BlockIcon>
              <AvailableAmountIcon />
            </BlockIcon>
            <BlockContent>
              <BlockHeader>
                <Translate path="page.vestingBalance.amount" />
              </BlockHeader>
              <BlockData>
                {roundAmount(parseAmount(balance.amount, precision), precision)}{' '}
                {displayName}
              </BlockData>
            </BlockContent>
          </Block>
          <DateTime>
            <BlockHeader>
              <Translate path="page.vestingBalance.beginDate" />
            </BlockHeader>
            <BlockData>{balance.startDate}</BlockData>
          </DateTime>
          {balance.type === 0 ? (
            // CDD
            <React.Fragment>
              <DateTime>
                <BlockHeader>
                  <Translate path="page.vestingBalance.vestingCliff" />
                </BlockHeader>
                <BlockData>
                  {balance.cliff} <Translate path="page.vestingBalance.days" />
                </BlockData>
              </DateTime>
              <DateTime>
                <BlockHeader>
                  <Translate path="page.vestingBalance.vestingPeriod" />
                </BlockHeader>
                <BlockData>
                  {balance.period} <Translate path="page.vestingBalance.days" />
                </BlockData>
              </DateTime>
            </React.Fragment>
          ) : (
            // Linear
            <React.Fragment>
              <DateTime>
                <BlockHeader>
                  <Translate path="page.vestingBalance.coinSecondsEarned" />
                </BlockHeader>
                <BlockData>
                  {balance.coinSecondsEarned}{' '}
                  <Translate path="page.vestingBalance.days" />
                </BlockData>
              </DateTime>
              <DateTime>
                <BlockHeader>
                  <Translate path="page.vestingBalance.coinSecondsRequired" />
                </BlockHeader>
                <BlockData>
                  {balance.vestingSeconds}{' '}
                  <Translate path="page.vestingBalance.days" />
                </BlockData>
              </DateTime>
            </React.Fragment>
          )}
        </BalanceRow>
        <BalanceRow>
          <Block>
            <BlockIcon>
              <AvailableWithdrawalIcon />
            </BlockIcon>
            <BlockContent>
              <BlockHeader>
                <Translate path="page.vestingBalance.availableToWithdraw" />
              </BlockHeader>
              <BlockData>
                <AnimatedNumber
                  value={roundAmount(
                    parseAmount(balance.availableWithdrawal, precision),
                    precision
                  )}
                />{' '}
                {displayName}
              </BlockData>
            </BlockContent>
          </Block>
          <Button
            label={translate('page.vestingBalance.withdraw')}
            mods="light"
            disabled={!balance.availableWithdrawal > 0 || isProcessing}
            isLoading={isProcessing}
            onClick={() =>
              this.handleWithdraw(
                balance.id,
                balance.availableWithdrawal,
                balance.assetId
              )
            }
          />
        </BalanceRow>
      </Balance>
    );
  }
}

export default VestingBalanceItem;
