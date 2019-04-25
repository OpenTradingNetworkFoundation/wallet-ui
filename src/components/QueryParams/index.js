import React from 'react';
import { connect } from 'react-redux';
import { isEqual, omitBy, mapValues, isEmpty, curry } from 'lodash';

import { routerSelectors } from 'ducks/router';
import withRouter from 'hocs/withRouter';

import { propTypes } from './props';

const includes = curry((array, value) => array.includes(value));

class QueryParams extends React.Component {
  static propTypes = propTypes;

  state = {
    params: {}
  };

  static getDerivedStateFromProps(props, state) {
    const { queryParams, params, routerActions } = props;

    if (isEqual(state.params, queryParams) && !isEmpty(queryParams)) {
      return {
        isValid: true
      };
    }

    const acceptedKeys = Object.keys(params);

    const validatedQueryParams = acceptedKeys.reduce((acc, validatedParam) => {
      const {
        values: acceptedParamValues,
        validator: validatorFunction,
        default: defaultParamValue
      } = params[validatedParam];

      const validatorFn = validatorFunction || includes(acceptedParamValues);

      return validatorFn(queryParams[validatedParam])
        ? { ...acc, [validatedParam]: queryParams[validatedParam] }
        : { ...acc, [validatedParam]: defaultParamValue };
    }, {});

    if (!isEqual(state.params, validatedQueryParams)) {
      const defaultQueryParams = mapValues(params, 'default');
      const navigationQueryParams = omitBy(
        validatedQueryParams,
        (paramValue, paramKey) => paramValue === defaultQueryParams[paramKey]
      );

      routerActions.navigate({ search: navigationQueryParams });
    }

    return {
      params: validatedQueryParams,
      isValid: true
    };
  }

  render() {
    const { isValid } = this.state;
    return isValid ? this.props.render(this.state.params) : null;
  }
}

export default connect(state => ({
  queryParams: routerSelectors.queryParams(state)
}))(withRouter(QueryParams));
