import URL from 'enums/url';
import React from 'react';
import { connect } from 'react-redux';

import cn from 'utils/bem';
import Modal from 'elements/Modal';
import { ASSET } from 'enums/asset';
import QueryParams from 'components/QueryParams';
import withRouter from 'hocs/withRouter';
import { balanceSelectors } from 'ducks/balance';
import { accountSelectors } from 'ducks/account';
import PageHeader from 'elements/PageHeader';

import ReceiveIcon from 'icons/receive.svg';

import ReceiveContent from '../Component';

import { propTypes } from './props';

const b = cn('receive-page');

class ReceivePage extends React.Component {
  static propTypes = propTypes;

  onClose = () => {
    const { routerActions, location } = this.props;
    routerActions.navigate({ pathname: URL.WALLET, from: location });
  };

  render() {
    const { balanceNames, accountName } = this.props;

    return (
      <Modal
        className={b()}
        HeaderContent={() => (
          <PageHeader Icon={ReceiveIcon} titlePath="page.receive.label" />
        )}
        isOpen
        onClose={this.onClose}
      >
        <QueryParams
          params={{
            asset: {
              values: balanceNames,
              default: ASSET.OTN
            }
          }}
          render={queryParams => (
            <ReceiveContent
              queryParams={queryParams}
              accountName={accountName}
            />
          )}
        />
      </Modal>
    );
  }
}

function mapStateToProp(state) {
  return {
    balanceNames: balanceSelectors.balanceNames(state),
    accountName: accountSelectors.accountName(state)
  };
}

export default connect(mapStateToProp)(withRouter(ReceivePage));
