const truncate = (text, maxLength, ellipsis = '...') => {
  const ellipsisLength = ellipsis.length;

  if (text.length <= maxLength) {
    return text;
  }

  const lengthStart = Math.ceil((maxLength - ellipsisLength) / 2);
  const lengthEnd = maxLength - lengthStart - ellipsisLength;

  return text.slice(0, lengthStart) + ellipsis + text.slice(-1 * lengthEnd);
};

export default truncate;
