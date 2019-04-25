import { Apis } from 'bitsharesjs-ws';

import cleanMocks from 'src/__utils__/cleanMocks';
import mockMethod from 'src/__utils__/mockMethod';

import { getAccountByName } from '../accountApi';

describe('accountApi', () => {
  let mock;
  let exec = jest.fn((requestName, [name]) => ({ name, id: 1 }));

  beforeAll(() => {
    mock = mockMethod(Apis, 'instance', () => ({
      db_api: jest.fn(() => ({
        exec
      }))
    }));
  });

  afterAll(() => cleanMocks([mock]));

  it('should return correct value', async () => {
    const account = await getAccountByName('passing name');

    expect(exec).toBeCalledWith('get_account_by_name', ['passing name']);
    expect(account).toEqual({ id: 1, name: 'passing name' });
  });
});
