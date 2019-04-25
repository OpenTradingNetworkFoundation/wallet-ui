import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SignUpForm from '../Form';
import SignUpResult from '../Result';

class SignUpPage extends React.Component {
  static propTypes = {
    signUp: PropTypes.object,
    signUpActions: PropTypes.object
  };

  render() {
    const { result: signUpResult } = this.props.signUp;

    return (
      <div className="sign-up-page">
        {signUpResult ? <SignUpResult /> : <SignUpForm />}
      </div>
    );
  }
}

function mapStateToProp(state) {
  return {
    signUp: state.signUp
  };
}

export default connect(mapStateToProp)(SignUpPage);
