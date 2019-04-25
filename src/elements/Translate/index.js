import React from 'react';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

import { translationSelectors } from 'ducks/translation';
import translate from 'services/translate';

import { propTypes } from './props';

class Translate extends React.Component {
  static propTypes = propTypes;

  shouldComponentUpdate(nextProps) {
    const { language, path, params, className } = this.props;

    const areParamsChanged = !isEqual(params, nextProps.params);

    return (
      areParamsChanged ||
      language !== nextProps.language ||
      path !== nextProps.path ||
      className !== nextProps.className
    );
  }

  render() {
    const { path, params, className, dataTestId } = this.props;
    const value = translate(path, params);

    return (
      <span className={className} data-testid={dataTestId}>
        {value}
      </span>
    );
  }
}

function mapStateToProp(state) {
  return {
    language: translationSelectors.getCurrentLanguage(state)
  };
}

export default connect(mapStateToProp)(Translate);
