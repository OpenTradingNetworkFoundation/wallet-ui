import React from 'react';
import PropTypes from 'prop-types';
import differenceInDays from 'date-fns/difference_in_days';

import OpenOrderProp from 'props/OpenOrder';
import CurrencyIcons from 'pages/Exchange/Pro/Page/CurrencyIcons';
import Translate from 'elements/Translate';
import { ORDER_TYPE } from 'pages/Exchange/Pro/Page/constants/orderType';
import AssetIcon from 'elements/AssetIcon';
import ProgressBar from 'elements/ProgressBar';
import { createMarket } from 'pages/Exchange/Pro/Page/MarketSelector/helpers';
import Spinner from 'elements/Spinner';
import translate from 'services/translate';

import CloseSvgIcon from 'icons/close.svg';
import TrashSvgIcon from 'icons/trash.svg';

import {
  Container,
  Row,
  Title,
  Percentage,
  Label,
  Text,
  Icon,
  Progress,
  ConfirmText,
  Button,
  CloseLabel,
  CloseIcon,
  TrashIcon,
  SpinnerContainer
} from './styled';

const getExpirationDeadline = date => {
  const daysLeft = differenceInDays(date, new Date());
  const key = `component.OpenOrder.expiration.${
    daysLeft === 0 ? 'today' : 'after'
  }`;

  return translate(key, { daysLeft });
};

class OpenOrder extends React.PureComponent {
  state = {
    showCloseButton: false,
    isLoading: false
  };

  showCloseButton = show => () => this.setState({ showCloseButton: show });

  closeOrder = () => {
    const { order, closeOrder } = this.props;

    this.setState({ isLoading: true }, async () => {
      try {
        await closeOrder(order);
      } catch (err) {
        this.setState({ isLoading: false });
      }
    });
  };

  render() {
    const {
      order: { base, quote, percentage, price, expiration, type }
    } = this.props;

    const { showCloseButton, isLoading } = this.state;

    return (
      <Container>
        <Row marginTop="0">
          <CurrencyIcons base={base.name} quote={quote.name} />
          <Title>{createMarket(base.name, quote.name)}</Title>
        </Row>

        <Row>
          <Percentage>{percentage}%</Percentage>
          <Progress>
            <ProgressBar progress={percentage} />
          </Progress>
          <Button
            onClick={this.showCloseButton(true)}
            padding="4px 6px"
            margin="0 0 0 16px"
          >
            <TrashIcon>
              <TrashSvgIcon />
            </TrashIcon>
          </Button>
        </Row>

        {showCloseButton ? (
          <React.Fragment>
            <Row marginTop="16px">
              <CloseLabel>
                <Translate path="component.OpenOrder.closeLabel" />
              </CloseLabel>
            </Row>
            <Row>
              <Button
                padding="8px 36px"
                onClick={this.closeOrder}
                disabled={isLoading}
              >
                <ConfirmText isLoading={isLoading}>
                  <Translate path="component.OpenOrder.confirm" />
                </ConfirmText>
                {isLoading && (
                  <SpinnerContainer>
                    <Spinner />
                  </SpinnerContainer>
                )}
              </Button>
              <Button
                padding="14px"
                margin="0 0 0 auto"
                onClick={this.showCloseButton(false)}
              >
                <CloseIcon>
                  <CloseSvgIcon />
                </CloseIcon>
              </Button>
            </Row>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Row marginTop="16px">
              <Label>
                <Translate path="component.OpenOrder.price" />
              </Label>
              <Text>{price}</Text>
            </Row>

            <Row>
              <Label>
                <Translate path="component.OpenOrder.expiration.title" />
              </Label>
              <Text>{getExpirationDeadline(expiration)}</Text>
            </Row>

            <Row>
              <Label>
                <Translate path="component.OpenOrder.direction.title" />
              </Label>
              <Text>
                {type === ORDER_TYPE.BUY ? (
                  <Translate path="component.OpenOrder.direction.buy" />
                ) : (
                  <Translate path="component.OpenOrder.direction.sell" />
                )}
              </Text>
            </Row>

            <Row>
              <Label>
                <Translate path="component.OpenOrder.amount" />
              </Label>
              <Text>
                {base.displayAmount}
                <Icon>
                  <AssetIcon assetName={base.name} isTokenized={false} />
                </Icon>
              </Text>
            </Row>

            <Row>
              <Label>
                <Translate path="component.OpenOrder.total" />
              </Label>
              <Text>
                {quote.displayAmount}
                <Icon>
                  <AssetIcon assetName={quote.name} isTokenized={false} />
                </Icon>
              </Text>
            </Row>
          </React.Fragment>
        )}
      </Container>
    );
  }
}

OpenOrder.propTypes = {
  order: OpenOrderProp,
  closeOrder: PropTypes.func
};

export default OpenOrder;
