import env from 'utils/env';
import { noop } from 'utils/noop';

const log = (...args) => {
  // eslint-disable-next-line
  !env.isProd() ? console.log(...args) : noop();
};

export default log;
