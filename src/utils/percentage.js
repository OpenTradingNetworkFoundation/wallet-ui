export const calculateDisplayPercentage = percentage => {
  const MIN_PERCENTAGE = 0.01;
  if (percentage === Infinity) {
    return `< ${MIN_PERCENTAGE}`;
  }
  const displayPercentage = (percentage = (100 * percentage).toFixed(2));
  return displayPercentage < MIN_PERCENTAGE
    ? `< ${MIN_PERCENTAGE}`
    : displayPercentage;
};
