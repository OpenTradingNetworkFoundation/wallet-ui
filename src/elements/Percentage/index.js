const sign = value => {
  if (value > 0) {
    return '+';
  } else if (value < 0) {
    return '-';
  } else {
    return '';
  }
};

const Percentage = ({ children }) => {
  return `${sign(children)}${Math.abs(children)}%`;
};

export default Percentage;
