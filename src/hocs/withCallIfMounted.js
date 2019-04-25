import React from 'react';
import PropTypes from 'prop-types';

import { noop } from 'utils/noop';

const withCallIfMounted = Component => {
  return class Wrapped extends React.Component {
    mounted = false;

    componentDidMount() {
      this.mounted = true;
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    callIfMounted = fn => {
      this.mounted ? fn() : noop();
    };

    render() {
      return <Component callIfMounted={this.callIfMounted} {...this.props} />;
    }
  };
};

withCallIfMounted.propTypes = {
  callIfMounted: PropTypes.func
};

export default withCallIfMounted;
