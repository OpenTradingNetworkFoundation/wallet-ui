import React from 'react';

import cn from 'utils/bem';

import { propTypes } from './props';

const b = cn('hover-container');

class HoverContainer extends React.Component {
  static propTypes = propTypes;

  state = {
    hover: false
  };

  onHover = newValue => () => {
    this.setState({ ...this.state, hover: newValue });
  };

  render() {
    const { children } = this.props;
    const { hover } = this.state;

    return (
      <div
        className={b()}
        onMouseEnter={this.onHover(true)}
        onMouseLeave={this.onHover(false)}
      >
        {children(hover)}
      </div>
    );
  }
}

export default HoverContainer;
