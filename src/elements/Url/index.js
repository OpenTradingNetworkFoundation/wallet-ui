import React from 'react';
import { Link } from 'react-router-dom';

import cn from 'utils/bem';

import { propTypes, defaultProps } from './props';
import './Url.styl';

const b = cn('url');

class Url extends React.Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  onClick = e => {
    const { onClick, link } = this.props;

    if (!link) {
      e.preventDefault();
    }

    if (onClick) {
      onClick(e);
    }
  };

  render() {
    const { isNative, children, link, className, newTab } = this.props;

    return (
      <React.Fragment>
        {isNative ? (
          <a
            href={link ? link : '#'}
            className={b(null, null, className)}
            onClick={this.onClick}
            target={newTab ? '_blank' : null}
          >
            {children}
          </a>
        ) : (
          <Link
            to={link ? link : '#'} // TODO: link prop should work with object
            className={b(null, null, className)}
            onClick={this.onClick}
          >
            {children}
          </Link>
        )}
      </React.Fragment>
    );

    //return isNative ? this._renderNativeUrl() : this._renderRouterUrl();
  }
}

export default Url;
