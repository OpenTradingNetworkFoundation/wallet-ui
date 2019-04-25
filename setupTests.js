import Validator from 'utils/Validator';

Validator.init();

jest.mock('api/assetsApi');
jest.mock('api/accountApi');
jest.mock('utils/localizer');
jest.mock('utils/jdenticon');
