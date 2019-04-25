const fs = require('fs');
const path = require('path');

const { get } = require('lodash');

class Localizer {
  _dictionary = {};

  constructor() {
    this._dictionary['en'] = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, '../../../public/locales/locale-en.json')
      )
    );
  }

  getValue(path) {
    const key = Array.isArray(path) ? path : path.split('.');
    return get(this._dictionary, ['en'].concat(key));
  }
}

const localizer = new Localizer();

module.exports = localizer;
