import AssetAmount from '../AssetAmount';

describe('AssetAmount', () => {
  describe('parse', () => {
    it('should handle absence of params', () => {
      expect(AssetAmount.parse()).toEqual('0');
    });

    it('should handle a call without precision', () => {
      expect(AssetAmount.parse(1)).toBe('1');
      expect(AssetAmount.parse(0.1)).toBe('0.1');
      expect(AssetAmount.parse(1.2312)).toBe('1.2312');
    });

    it('should correctly parse a large number', () => {
      expect(AssetAmount.parse(123456789, 2)).toBe('1234567.89');
      expect(AssetAmount.parse(123456789, 9)).toBe('0.123456789');
    });
  });

  describe('normalize', () => {
    it('should handle absence of params', () => {
      expect(AssetAmount.normalize()).toBe(0);
    });

    it('should handle a call without precision', () => {
      expect(AssetAmount.normalize('1')).toBe('1');
      expect(AssetAmount.normalize('0.0001')).toBe('1');
      expect(AssetAmount.normalize('1.2312')).toBe('12312');
    });

    it('should correctly normalize a number', () => {
      expect(AssetAmount.normalize('1', 1)).toBe('10');
      expect(AssetAmount.normalize('0.00015', 5)).toBe('15');
      expect(AssetAmount.normalize('1.2312', 2)).toBe('123');
    });
  });

  describe('round', () => {
    it('should handle absence of params', () => {
      expect(AssetAmount.round()).toBe('0');
    });

    it('should correctly round a number', () => {
      expect(AssetAmount.round(1, 1)).toBe('1');
      expect(AssetAmount.round('0.0001501231421', 5)).toBe('0.00015');
      expect(AssetAmount.round('1.2312', 2)).toBe('1.23');
      expect(AssetAmount.round('100', 2)).toBe('100');
      expect(AssetAmount.round(1 / 2, 8)).toBe('0.5');
    });

    it('should floor the value', () => {
      expect(AssetAmount.round(1.2999, 1, Math.floor)).toBe('1.2');
    });

    it('should ceil the value', () => {
      expect(AssetAmount.round(1.21, 1, Math.ceil)).toBe('1.3');
    });

    it('should just return 1e20 for any values > than 1e20', () => {
      expect(AssetAmount.round(1e21, 8)).toBe(100000000000000000000);
    });
  });

  describe('sumDecimal', () => {
    it('should sum int values', () => {
      expect(AssetAmount.sumDecimal('1', '2', 4)).toEqual('3');
    });

    it('should sum float values', () => {
      expect(AssetAmount.sumDecimal('1.12', '2.34', 4)).toEqual('3.46');
    });

    it('should sum mixed values', () => {
      expect(AssetAmount.sumDecimal('1', '2.34', 4)).toEqual('3.34');
    });
  });

  describe('subtractDecimal', () => {
    it('should subtract int values', () => {
      expect(AssetAmount.subtractDecimal('3', '1', 4)).toEqual('2');
    });

    it('should subtract float values', () => {
      expect(AssetAmount.subtractDecimal('3.12', '2.1', 4)).toEqual('1.02');
    });

    it('should subtract correcty with negative result', () => {
      expect(AssetAmount.subtractDecimal('3.12', '5.12', 4)).toEqual('-2');
    });

    it('should subtract mixed values', () => {
      expect(AssetAmount.subtractDecimal('3', '2.34', 4)).toEqual('0.66');
    });
    it('should subtract big values', () => {
      expect(
        AssetAmount.subtractDecimal('100000000000000000000', '11.72', 4)
      ).toEqual('99999999999999999988.28');
    });
  });

  describe('divide', () => {
    it('should divide int values', () => {
      expect(AssetAmount.divide(6, 4, 4)).toEqual('1.5');
    });

    it('should divide int values with int result', () => {
      expect(AssetAmount.divide(6, 2, 4)).toEqual('3');
    });

    it('should divide mixed values', () => {
      expect(AssetAmount.divide('3', '1.17', 4)).toEqual('2.5642');
    });

    it('should divide big values', () => {
      expect(AssetAmount.divide(1e21, 1e10, 4)).toEqual('100000000000');
    });
  });
});
