import positiveNumberMask from '../positiveNumber';

const INCORRECT_CHARS = Array.from(`q!@#$%^&*()_+=-"№%:,;<>±§\`~][/?|\\`);

describe('Positive number mask', () => {
  describe('positiveNumberMask', () => {
    it('should format empty string correctly', () => {
      expect(positiveNumberMask('')).toEqual('');
    });

    it('should remove incorrect symbols at the end', () => {
      INCORRECT_CHARS.forEach(char =>
        expect(positiveNumberMask(`12${char}`)).toEqual('12')
      );
    });

    it('should remove incorrect symbols at start', () => {
      INCORRECT_CHARS.forEach(char =>
        expect(positiveNumberMask(`${char}12`)).toEqual('12')
      );
    });

    it('should remove incorrect symbols at the end', () => {
      INCORRECT_CHARS.forEach(char =>
        expect(positiveNumberMask(`1${char}2`)).toEqual('12')
      );
    });

    it('default precision works correctly', () => {
      expect(positiveNumberMask('0.000000012')).toEqual('0.00000001');
      expect(positiveNumberMask('10000000.000000010')).toEqual(
        '10000000.00000001'
      );
    });

    it('should allow 0s at the end', () => {
      expect(positiveNumberMask('0.00000100')).toEqual('0.00000100');
    });

    it('should use custom precision', () => {
      expect(positiveNumberMask('0.00000100', 6)).toEqual('0.000001');
    });
  });
});
