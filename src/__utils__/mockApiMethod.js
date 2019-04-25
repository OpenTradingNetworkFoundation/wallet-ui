import { Apis } from 'bitsharesjs-ws';

import mockMethod from 'src/__utils__/mockMethod';

const mockApiMethod = mockFunction => {
  let exec = jest.fn(mockFunction);

  const api = mockMethod(Apis, 'instance', () => ({
    db_api: jest.fn(() => ({
      exec
    }))
  }));

  return { api, exec };
};

export default mockApiMethod;
