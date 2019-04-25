import React from 'react';
import { Tooltip as ExternalTooltip } from 'react-tippy';

import cn from 'utils/bem';

import { propTypes, defaultProps } from './props';

import './style.styl';

const b = cn('tooltip');

class Tooltip extends React.PureComponent {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  componentWillUnmount() {
    if (this.contentRef) {
      this.contentRef.style.display = 'none';
    }
  }

  componentDidUpdate() {
    if (!this.contentRef) {
      return;
    }

    if (this.props.disabled) {
      this.contentRef.style.display = 'none';
    }
  }

  render() {
    const {
      renderTooltip,
      renderTitle,
      className,
      contentClassName,
      mods,
      ...props
    } = this.props;

    return (
      <ExternalTooltip
        {...props}
        className={b(null, null, className)}
        unmountHTMLWhenHide={true}
        html={
          <div
            ref={element => (this.contentRef = element)}
            className={b('content', mods, contentClassName)}
          >
            {renderTitle()}
          </div>
        }
      >
        {renderTooltip()}
      </ExternalTooltip>
    );
  }
}

export default Tooltip;
