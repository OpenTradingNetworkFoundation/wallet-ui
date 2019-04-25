import React from 'react';
import CountUp from 'countup.js';

import { propTypes } from './props';

const safeDecimals = value => {
  try {
    return value.split('.')[1].length;
  } catch (error) {
    return 0;
  }
};

class AnimatedNumber extends React.PureComponent {
  static propTypes = propTypes;

  componentDidMount() {
    // first create an instance without any animation
    this.createInstance({ start: this.props.value, end: this.props.value });
  }

  componentDidUpdate(prevProps) {
    const { value: start } = prevProps;
    const { value: end } = this.props;

    // then on each update we need to recreate the instance because decimals change
    this.createInstance({ start, end });
    this.instance.start();
  }

  componentWillUnmount() {
    this.instance = {};
  }

  createInstance({ start, end }) {
    const decimals = safeDecimals(end);

    const parameters = {
      element: this.containerRef,
      start,
      end,
      decimals,
      duration: 2
    };

    this.instance = new CountUp(
      parameters.element,
      parameters.start,
      parameters.end,
      parameters.decimals,
      parameters.duration,
      {
        separator: ''
      }
    );
  }

  render() {
    return <span ref={element => (this.containerRef = element)} />;
  }
}
export default AnimatedNumber;
