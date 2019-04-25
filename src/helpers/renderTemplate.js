import { template } from 'lodash';

export default function renderTemplate(value, params) {
  return template(value)(params);
}
