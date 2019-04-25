import { flatten, kebabCase } from 'lodash';

/**
 * Usage:
 * import cn from 'utils/bem';
 *
 * const b = cn('Aston');
 *
 * b(); // Aston
 *
 * b('title');                   // Aston__title
 * b('title', 'mod1');           // Aston__title Aston__title--mod1
 * b('title', ['mod1', 'mod2']); // Aston__title Aston__title--mod1 Aston__title--mod2
 * b('title', ['mod1', 'mod2', { mod3: true, mod4: false }]); // Aston__title Aston__title--mod1 Aston__title--mod2 Aston__title--mod3
 * b('title', {mod1: true, mod2: false}); // Aston__title Aston__title--mod1
 *
 * b(null, 'mod1'); // Aston Aston_mod1
 * b(null, ['mod1', 'mod2']); // Aston Aston--mod1 Aston--mod2
 * b(null, (['mod1', 'mod2', { mod3: true, mod4: false }]); // Aston Aston--mod1 Aston--mod2 Aston--mod-3
 * b(null, {mod1: true, mod2: false}); // Aston Aston_mod1
 *
 * const titleColor = orange;
 * b('title', {[titleColor]: true, hide: true}) // Aston__title Aston__title--orange Aston__title--hide
 *
 * b(null, null, 'foo'); // Aston foo
 *
 * b('title', null, 'foo');           // Aston__title foo
 * b('title', null, ['foo', 'bar']);  // Aston__title foo bar
 * b('title', null, ['foo', 'bar', { baz: true, qux: false }]);  // Aston__title foo bar baz
 * b('title', null, {foo: true, bar: false}); // Aston__title foo
 *
 * b('title', ['mod1'], ['foo', 'baz']); // Aston__title Aston_title--mod1 foo baz
 *
 */

export const objectToArray = obj =>
  Object.keys(obj)
    .filter(i => obj[i])
    .map(i => kebabCase(i));

export const parse = data => {
  if (!data) return [];

  let ret = data;

  if (typeof data === 'string' || typeof data === 'number') {
    ret = [data];
  } else if (!Array.isArray(data)) {
    if (Object.prototype.hasOwnProperty.call(data, 'toString')) {
      ret = [data];
    } else {
      ret = objectToArray(data);
    }
  }

  ret = ret
    .filter(Boolean)
    .map(v => (typeof v === 'object' ? objectToArray(v) : v));

  return flatten(ret);
};

const cn = block => {
  return (element = '', mods = [], externalClasses = []) => {
    const cl = element ? `${block}__${element}` : block;
    const modifiers = parse(mods).map(mod => `${cl}--${mod}`);
    const externalClassList = parse(externalClasses);

    return [cl]
      .concat(modifiers)
      .concat(externalClassList)
      .join(' ');
  };
};

export default cn;
