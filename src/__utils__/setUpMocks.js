import cleanMocks from 'src/__utils__/cleanMocks';

const setUpMocks = (makeMocks, callback) => {
  let mocks;

  beforeAll(() => {
    mocks = makeMocks();
    callback && callback(mocks);
  });

  afterAll(() => cleanMocks(mocks)());
};

export default setUpMocks;
