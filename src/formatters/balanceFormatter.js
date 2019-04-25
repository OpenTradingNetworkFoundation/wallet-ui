const DEFAULT_NAME = 'Unknown asset';
const DEFAULT_PRECISION = 8;

function _fromApi(balance, assets) {
  const asset = assets.find(asset => asset.id === balance.asset_id);
  const name = asset ? asset.name : DEFAULT_NAME;

  return {
    id: balance.asset_id,
    amount: parseFloat(balance.amount),
    asset: name, // TODO this field is required for backward capability. It should be removed later as depracated.
    name,
    precision: asset ? asset.precision : DEFAULT_PRECISION
  };
}

export function fromApi(payload, assets) {
  return Array.isArray(payload)
    ? payload.map(balance => _fromApi(balance, assets))
    : _fromApi(payload, assets);
}
