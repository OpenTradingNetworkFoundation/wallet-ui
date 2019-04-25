import { ASSET } from 'enums/asset';

function _fromApi(asset) {
  let result = {
    id: asset.id,
    name: asset.symbol,
    precision: asset.precision
  };

  result.displayName =
    result.name === ASSET.OTN ? result.name : `OTN.${result.name}`;

  return result;
}

export function fromApi(payload) {
  return Array.isArray(payload) ? payload.map(_fromApi) : _fromApi(payload);
}
