import { template } from 'lodash';

class TemplateEngine {
  _cache = {};

  flushCache() {
    this._cache = {};
  }

  render(value, params) {
    let renderFunction = this._cache[value];

    if (!renderFunction) {
      renderFunction = template(value);
      this._cache[value] = renderFunction;
    }

    return renderFunction(params);
  }
}

const templateEngine = new TemplateEngine();

export default templateEngine;
