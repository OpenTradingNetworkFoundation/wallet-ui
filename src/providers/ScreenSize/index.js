import React from 'react';

import { isSmall } from 'services/breakpoints';

import { propTypes } from './props';

const Context = React.createContext();

class ScreenSize extends React.Component {
  static propTypes = propTypes;

  static Consumer = Context.Consumer;

  state = {
    isSmall: isSmall()
  };

  componentDidMount() {
    window.addEventListener('resize', this.onSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onSizeChange);
  }

  onSizeChange = () => {
    this.setState({ isSmall: isSmall() });
  };

  render() {
    const { children } = this.props;

    return <Context.Provider value={this.state}>{children}</Context.Provider>;
  }
}

export default ScreenSize;
