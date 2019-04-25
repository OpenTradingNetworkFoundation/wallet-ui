import React from 'react';
import { ChainStore } from 'bitsharesjs';

import { tickerVolume } from 'api/marketApi';
import withCallIfMounted from 'hocs/withCallIfMounted';

import { propTypes } from './props';

class VolumePrice extends React.PureComponent {
  static propTypes = propTypes;

  state = {
    volume: '',
    percentage: '',
    price: ''
  };

  fetchVolumeChange = () => {
    const { base, quote } = this.props;
    return tickerVolume(base, quote).then(ticker => {
      this.props.callIfMounted(() =>
        this.setState({
          price: ticker.highest_bid,
          percentage: ticker.percent_change,
          volume: ticker.quote_volume
        })
      );
    });
  };

  componentDidMount() {
    this.fetchVolumeChange();
    ChainStore.subscribe(this.fetchVolumeChange);
  }

  componentWillUnmount() {
    ChainStore.unsubscribe(this.fetchVolumeChange);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.quote !== this.props.quote ||
      prevProps.base !== this.props.base
    ) {
      this.fetchVolumeChange();
    }
  }
  render() {
    const { volume, percentage, price } = this.state;

    return this.props.children(volume, percentage, price);
  }
}

export default withCallIfMounted(VolumePrice);
