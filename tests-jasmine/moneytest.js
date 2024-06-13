import { formatCurrency } from '../scripts/utility/money.js';

describe('test suite : formatCurrency',()=>{
    it('convert to 2 decimal places', () =>{
        expect(formatCurrency(2095)).toEqual('2095.00');
    });
    it('works with 0', () =>{
        expect(formatCurrency(0)).toEqual('0.00');
    });
    
    it('checks rounding', () =>{
        expect(formatCurrency(2000.5)).toEqual('2001.00');
    });
});