import {generateOtpWithLength} from "../codes";

describe('Codes', () => {
  describe('generateOtpWithLength', () => {
    it('should generate a random number with the specified length', () => {
      const length = 6;
      const otp = generateOtpWithLength(length);
      expect(typeof otp).toBe('number');
      expect(otp.toString().length).toEqual(length);
    });

    it('should generate a random number with another specified length', () => {
      const length = 4;
      const otp = generateOtpWithLength(length);
      expect(typeof otp).toBe('number');
      expect(otp.toString().length).toEqual(length);
    });
  })
});