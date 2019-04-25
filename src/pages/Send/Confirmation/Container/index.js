import React from 'react';
import { connect } from 'react-redux';

import ConfirmationBox from 'components/ConfirmationBox';
import { accountSelectors } from 'ducks/account';
import translate from 'services/translate';

import Component from '../Component';

import { propTypes } from './props';

const Container = props => {
  const { data, accountName, ...handlers } = props;

  return (
    <ConfirmationBox
      {...handlers}
      render={() => <Component {...data} accountName={accountName} />}
      confirmButtonLabel={translate('page.send.confirmButtonLabel')}
    />
  );
};

Container.propTypes = propTypes;

export default connect(state => ({
  accountName: accountSelectors.accountName(state)
}))(Container);
