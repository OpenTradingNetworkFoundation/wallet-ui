import React from 'react';
import PropTypes from 'prop-types';
/*import * as TradingView from 'vendor/tv/charting_library.min';

import { Container } from './styled';
import { DataFeed, getResolutionsFromBuckets } from './helpers';

const DAY = 4 * 6 * 3600;
const AVAILABLE_RESOLUTIONS = [86400, 14400, 3600, 1800, 900, 300, 60];

const ENABLED_FEATURES = [];

const DISABLED_FEATURES = [
  'header_saveload',
  'symbol_info',
  'symbol_search_hot_key',
  'border_around_the_chart',
  'header_symbol_search',
  'header_compare',
  'left_toolbar',
  'chart_crosshair_menu',
  'chart_events',
  'footer_share_buttons',
  'footer_screenshot',
  'footer_publish_idea_button',
  'caption_buttons_text_if_possible',
  'line_tool_templates',
  'widgetbar_tabs',
  'support_manage_drawings',
  'support_multicharts',
  'right_bar_stays_on_scroll',
  'charts_auto_save',
  'edit_buttons_in_legend',
  'context_menus',
  'header_fullscreen_button',
  'symbollist_context_menu',
  'show_pro_features',
  'go_to_date',
  'legend_context_menu',
  'timezone_menu',
  'timeframes_toolbar',

  'header_chart_type',
  'header_settings',
  'header_indicators',
  'header_compare',
  'header_undo_redo',
  'header_screenshot',
  'header_fullscreen_button'
];

const BACKGROUND_COLOR = '#313753';
const AXIS_LINE_COLOR = 'rgba(255, 255, 255, 0.1)';
const TEXT_COLOR = 'rgba(255, 255, 255, 0.5)';

const DEFAULT_PARAMS = {
  fullscreen: false,
  interval: DAY,
  library_path: '/vendor/tv/',
  custom_css_url: 'otn_custom.css',
  save_image: false,
  charts_storage_api_version: '1.1',
  client_id: 'tradingview.com',
  user_id: 'public_user_id',
  autosize: true,
  locale: 'en',
  timezone: 'Europe/London',
  toolbar_bg: BACKGROUND_COLOR,
  overrides: {
    'paneProperties.background': BACKGROUND_COLOR,
    'paneProperties.horzGridProperties.color': AXIS_LINE_COLOR,
    'paneProperties.vertGridProperties.color': AXIS_LINE_COLOR,
    'scalesProperties.lineColor': AXIS_LINE_COLOR,
    'scalesProperties.textColor': TEXT_COLOR
  },
  enabled_features: ENABLED_FEATURES,
  disabled_features: DISABLED_FEATURES,
  debug: false,
  preset: ''
};

class TradingViewWrapper extends React.Component {
  chart = null;
  dataFeed = null;

  componentDidMount() {
    this.loadChart();
  }

  componentWillUnmount() {
    this._clear();
  }

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.base !== this.props.base || nextProps.quote !== this.props.quote
    );
  }

  componentDidUpdate() {
    this.chart.setSymbol(
      this.props.base + '_' + this.props.quote,
      this.chart.symbolInterval().interval
    );
  }

  loadChart = () => {
    this._clear();

    const base = this.props.base;
    const quote = this.props.quote;
    const resolutions = AVAILABLE_RESOLUTIONS;

    const dataFeed = new DataFeed();

    dataFeed.update({
      resolutions: resolutions,
      ticker: base + '_' + quote,
      interval: getResolutionsFromBuckets([DAY])[0]
    });

    this.dataFeed = dataFeed;

    this.chart = new TradingView.widget({
      ...DEFAULT_PARAMS,

      symbol: quote + '_' + base,
      datafeed: dataFeed,
      container_id: 'tv_chart'
    });

    this.chart.onChartReady(() => {
      dataFeed.update({
        onMarketChange: this._setSymbol.bind(this)
      });
    });
  };

  _clear() {
    if (this.chart) {
      this.chart.remove();
      this.chart = null;
    }

    if (this.dataFeed) {
      this.dataFeed.clearSubs();
    }
  }

  _setSymbol() {
    const ticker = this.chart.symbolInterval().symbol;

    if (this.chart) {
      this.chart.setSymbol(ticker, this.chart.symbolInterval().interval);
    }
  }

  render() {
    return <Container id="tv_chart" />;
  }
} */

class TradingViewWrapper extends React.Component {
  render() {
    return <div>Please follow README.md to use Trading View chart here</div>;
  }
}

TradingViewWrapper.propTypes = {
  base: PropTypes.string,
  quote: PropTypes.string
};

export default TradingViewWrapper;
