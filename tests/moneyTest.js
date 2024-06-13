import {formatCurrency} from "../scripts/utility/money.js";

console.log('test suite : formatCurrency')
//basic cases
console.log('convert to 2 decimal places')

if(formatCurrency(2095) === '2095.00')
{
    console.log('passed')
}
else console.log("failed");

//edge cases

console.log('works with 0')

if(formatCurrency(0) === '0.00') console.log('passed');
else console.log('failed');

console.log('checks rounding')

if(formatCurrency(2000.5) === '2001.00') console.log('passed');
else console.log('failed');

console.log('checks rounding')

if(formatCurrency(2000.4) === '2000.00') console.log('passed');
else console.log('failed');