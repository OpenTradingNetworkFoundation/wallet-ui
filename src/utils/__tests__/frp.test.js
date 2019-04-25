import { reduceByKey, reduceById } from '../frp';

describe('frp utils', () => {
  test('reduceById', () => {
    expect(
      reduceById([{ id: 1, name: 'one' }, { id: 2, name: 'two' }])
    ).toEqual({
      1: { id: 1, name: 'one' },
      2: { id: 2, name: 'two' }
    });
  });

  test('reduceByKey', () => {
    const reduceByObjId = reduceByKey('id');
    const reduceByObjName = reduceByKey('name');

    expect(
      reduceByObjId([{ id: 1, name: 'one' }, { id: 2, name: 'two' }])
    ).toEqual({
      1: { id: 1, name: 'one' },
      2: { id: 2, name: 'two' }
    });

    expect(
      reduceByObjName([{ id: 1, name: 'one' }, { id: 2, name: 'two' }])
    ).toEqual({
      one: { id: 1, name: 'one' },
      two: { id: 2, name: 'two' }
    });
  });
});
