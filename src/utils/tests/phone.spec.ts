import {validatePhoneNumber} from "../phone";

describe('Phone utils', () => {
  describe('validatePhoneNumber', () => {
    it('should handle country code', () => {
      expect(validatePhoneNumber('+11234567890')).toBeTruthy();
    });

    it('should handle no country code', () => {
      expect(validatePhoneNumber('1234567890')).toBeTruthy();
    });
  });
})