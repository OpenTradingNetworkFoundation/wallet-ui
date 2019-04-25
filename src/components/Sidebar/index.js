import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import { accountSelectors } from 'ducks/account';

import Component from './Component';

import { propTypes } from './props';

class Sidebar extends React.Component {
  static propTypes = propTypes;

  render() {
    const { accountName, small } = this.props;

    return (
      <React.Fragment>
        <Component id="big" accountName={accountName} hidden={small} />
        <Component id="small" accountName={accountName} small hidden={!small} />
      </React.Fragment>
    );
  }
}

function mapStateToProp(state) {
  return {
    accountName: accountSelectors.accountName(state)
  };
}

export default compose(withRouter, connect(mapStateToProp))(Sidebar);
