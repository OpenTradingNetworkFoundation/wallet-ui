import { range } from 'lodash';
import * as BitsharesAPI from 'bitsharesjs';

import cleanMock from 'src/__utils__/cleanMocks';
import mockApiMethod from 'src/__utils__/mockApiMethod';
import mockMethod from 'src/__utils__/mockMethod';

import {
  getAllOpenOrders,
  getOpenOrders,
  getOrders,
  closeOrder
} from '../ordersApi';

describe('ordersApi', () => {
  describe('getOrders', () => {
    let mock;

    const apiResult = {};

    beforeAll(() => {
      mock = mockApiMethod(() => apiResult);
    });

    afterAll(() => cleanMock([mock.exec, mock.api])());

    test('getOrders method', async () => {
      const result = await getOrders('base', 'quote');

      expect(result).toBe(apiResult);
      expect(mock.exec).toBeCalledWith('get_limit_orders', [
        'base',
        'quote',
        1000
      ]);
    });
  });

  describe('getOpenOrders', () => {
    describe('with default params', () => {
      let mock;
      const apiResult = {};

      beforeAll(() => {
        mock = mockApiMethod(() => apiResult);
      });

      afterAll(() => cleanMock([mock.exec, mock.api])());

      test('call method', async () => {
        const result = await getOpenOrders('1.2.20');

        expect(result).toBe(apiResult);
        expect(mock.exec).toBeCalledWith('get_active_limit_orders', [
          '1.2.20',
          100,
          null
        ]);
      });
    });

    describe('with specific params', () => {
      let mock;
      const apiResult = {};

      beforeAll(() => {
        mock = mockApiMethod(() => apiResult);
      });

      afterAll(() => cleanMock([mock.exec, mock.api])());

      test('call method', async () => {
        const result = await getOpenOrders('1.2.20', 50, '1.7.0');

        expect(result).toBe(apiResult);
        expect(mock.exec).toBeCalledWith('get_active_limit_orders', [
          '1.2.20',
          50,
          '1.7.0'
        ]);
      });
    });
  });

  describe('getAllOpenOrders', () => {
    describe('when less than 100 open orders', () => {
      let mock;
      const firstOrders = range(10).map(id => ({ id: `1.7.${id}` }));

      beforeAll(() => {
        mock = mockApiMethod(() => firstOrders);
      });

      afterAll(() => cleanMock([mock.exec, mock.api])());

      test('call method', async () => {
        const result = await getAllOpenOrders('1.2.20');

        expect(result).toEqual(firstOrders);
        expect(mock.exec).toBeCalledTimes(1);
        expect(mock.exec).toBeCalledWith('get_active_limit_orders', [
          '1.2.20',
          100,
          null
        ]);
      });
    });

    describe('when more than 100 open orders', () => {
      let mock;
      const firstOrders = range(100).map(id => ({ id: `1.7.${id}` }));
      const lastOrder = { id: '1.7.100' };

      beforeAll(() => {
        mock = mockApiMethod(
          (method, params) => (params[2] ? [lastOrder] : firstOrders)
        );
      });

      afterAll(() => cleanMock([mock.exec, mock.api])());

      test('call method', async () => {
        const result = await getAllOpenOrders('1.2.20');

        expect(result).toEqual(firstOrders.concat(lastOrder));
        expect(mock.exec).toBeCalledTimes(2);
        expect(mock.exec).toBeCalledWith('get_active_limit_orders', [
          '1.2.20',
          100,
          null
        ]);
        expect(mock.exec).toBeCalledWith('get_active_limit_orders', [
          '1.2.20',
          100,
          '1.7.100'
        ]);
      });
    });
  });

  describe('closeOrder', () => {
    const mock = {};
    let operationType = {};

    beforeAll(() => {
      function FakeTransactionBuilder() {
        let tb = {};
        mock.getTypeOperation = jest.fn(() => operationType);
        tb.get_type_operation = mock.getTypeOperation;

        mock.updateHeadBlock = jest.fn();
        tb.update_head_block = mock.updateHeadBlock;

        mock.addOperation = jest.fn();
        tb.add_operation = mock.addOperation;

        mock.addSigner = jest.fn();
        tb.add_signer = mock.addSigner;

        mock.setRequiredFees = jest.fn();
        tb.set_required_fees = mock.setRequiredFees;

        mock.broadcast = jest.fn();
        tb.broadcast = mock.broadcast;

        return tb;
      }

      mock.main = mockMethod(
        BitsharesAPI,
        'TransactionBuilder',
        FakeTransactionBuilder
      );
    });

    afterAll(() => {
      cleanMock(Object.values(mock))();
    });

    test('call method', async () => {
      const keys = { privateKey: { token: 'token' }, publicKey: 'public' };

      await closeOrder({ id: '1.7.0', base: { id: '1.3.2' } }, '1.2.0', keys);

      expect(mock.main).toBeCalled();
      expect(mock.getTypeOperation).toBeCalledWith('limit_order_cancel', {
        fee: { amount: 0, asset_id: '1.3.2' },
        fee_paying_account: '1.2.0',
        order: '1.7.0'
      });
      expect(mock.updateHeadBlock).toBeCalled();
      expect(mock.addOperation).toBeCalledWith(operationType);

      expect(mock.addSigner).toBeCalledWith(keys.privateKey, keys.publicKey);

      expect(mock.setRequiredFees).toBeCalledWith('1.3.2', true);
      expect(mock.broadcast).toBeCalled();
    });
  });
});
