import './spec_helper';
import { encodeQueryString } from '../src/lib';

describe('lib', () => {
  describe('encodeQueryString', () => {
    it('Should correctly encode a query string', () => {
      let table = [
        { input: [], want: '' },
        { input: [['a', '1']], want: 'a=1' },
        { input: [['a', '1'], ['b', '2']], want: 'a=1&b=2' },
        { input: [['email', 'paul@smith.com']], want: 'email=paul%40smith.com' }
      ];

      table.forEach((tc) => {
        expect(encodeQueryString(tc.input)).to.equal(tc.want);
      });
    });
  });
});
