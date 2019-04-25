import React from 'react';

import cn from 'utils/bem';
import jdenticon from 'utils/jdenticon';

import { propTypes } from './props';

const b = cn('jdenticon');

class JDenticon extends React.Component {
  static propTypes = propTypes;

  componentDidMount() {
    const { id } = this.props;

    jdenticon.update(`#${id}`);
  }

  render() {
    const { id, value, className } = this.props;

    return (
      <svg
        id={id}
        className={b(null, null, className)}
        data-jdenticon-value={value}
        data-testid={id}
      />
    );
  }
}

export default JDenticon;
