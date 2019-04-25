import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { sendFundsActions } from 'ducks/send-funds';
import { balanceSelectors } from 'ducks/balance';

import cn from 'utils/bem';
import localizer from 'utils/localizer';
import Modal from 'elements/Modal';
import EmptyPlaceholder from 'components/EmptyPlaceholder';
import QueryParams from 'components/QueryParams';
import withRouter from 'hocs/withRouter';
import PageHeader from 'elements/PageHeader';

import URL from 'enums/url';
import { ASSET } from 'enums/asset';

import SendIcon from 'icons/send.svg';

import SendForm from '../Form/Container';
import Confirmation from '../Confirmation/Container';

import { propTypes } from './props';

const STEP = {
  FORM: 'form',
  CONFIRM: 'confirm'
};

const b = cn('send-page');

class SendPage extends React.Component {
  static propTypes = propTypes;

  state = {
    step: STEP.FORM,
    data: {
      form: null
    },
    meta: {
      form: null
    }
  };

  onSubmitForm = (formState, { feeAmount }) => {
    const { data, meta } = this.state;

    this.setState({
      ...this.state,
      step: STEP.CONFIRM,
      data: {
        ...data,
        form: { ...formState }
      },
      meta: {
        ...meta,
        form: { feeAmount }
      }
    });
  };

  onConfirmSend = () => {
    const { data: { form } } = this.state;

    const { send } = this.props;
    send(form);

    const { routerActions, location } = this.props;
    routerActions.navigate({ pathname: URL.WALLET, from: location });
  };

  onBack = () => {
    this.setState({ ...this.state, step: STEP.FORM });
  };

  onClose = () => {
    const { routerActions, location } = this.props;
    routerActions.navigate({ pathname: URL.WALLET, from: location });
  };

  render() {
    const { hasBalances, balanceNames } = this.props;
    const { step, data, meta } = this.state;

    const Content =
      step === STEP.FORM ? (
        <QueryParams
          params={{
            asset: {
              values: balanceNames,
              default: ASSET.OTN
            }
          }}
          render={queryParams => (
            <SendForm
              onSubmit={this.onSubmitForm}
              queryParams={queryParams}
              formState={data.form}
            />
          )}
        />
      ) : (
        <Confirmation
          onBack={this.onBack}
          onConfirm={this.onConfirmSend}
          data={{ ...data.form, ...meta.form }}
        />
      );

    return (
      <Modal
        className={b()}
        HeaderContent={
          hasBalances
            ? () => <PageHeader Icon={SendIcon} titlePath="page.send.label" />
            : null
        }
        isOpen
        onClose={this.onClose}
      >
        {hasBalances ? (
          Content
        ) : (
          <EmptyPlaceholder
            title={localizer.getValue('page.send.empty.title')}
            description={localizer.getValue('page.send.empty.description')}
          />
        )}
      </Modal>
    );
  }
}

function mapStateToProp(state) {
  return {
    hasBalances: balanceSelectors.hasBalances(state),
    notEmptyNames: balanceSelectors.notEmptyNames(state),
    balanceNames: balanceSelectors.balanceNames(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    send: bindActionCreators(sendFundsActions.sendFunds, dispatch)
  };
}

export default connect(mapStateToProp, mapDispatchToProps)(
  withRouter(SendPage)
);
