import { getScreenParams } from 'utils/screenParams';

const mobile = {
  from: 0,
  to: 767
};

const small = {
  from: 0,
  to: 880
};

const checkResolution = params => {
  const width = getScreenParams().width;
  return params.from <= width && params.to >= width;
};

export const isMobile = () => checkResolution(mobile);

export const isSmall = () => checkResolution(small);
