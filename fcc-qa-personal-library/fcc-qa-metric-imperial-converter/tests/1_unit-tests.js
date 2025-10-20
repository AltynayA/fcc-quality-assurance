const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    // #1
    test('Read  a whole number input', function() {
        assert.equal(convertHandler.getNum('32L'), 32);
    });
    // #2
    test('Read a decimal number input', function() {
        assert.equal(convertHandler.getNum('3.5gal'), 3.5);
    });
    // #3
    test('Read a fractional input', function() {
        assert.equal(convertHandler.getNum('1/2mi'), 0.5);
    });
    // #4
    test('Read a fractional input with a decimal.', function() {
        assert.equal(convertHandler.getNum('3.6/2lbs'),1.8)
    });
    // #5
    test('Return an error on a double-fraction', function() {
        assert.equal(convertHandler.getNum('3/5/6kg'),'invalid number');
    });
    // #6
    test('Default to a numerical input of 1', function() {
        assert.equal(convertHandler.getNum('lbs'),1 );
    });
    // #7
    test('Read each valid input unit', function() {
        const validTestUnits = ['L','gal','mi','km','kg','lbs'];
        validTestUnits.forEach(unit => {
            assert.equal(convertHandler.getUnit('15' + unit), unit === 'l' ? 'L' : unit);
        });
    });
    // #8
    test('Return an error for an invalid input unit', function() {
        assert.equal(convertHandler.getUnit('100g'), 'invalid unit')
    });
    // #9
    test('Return the correct return unit for each valid input unit', function() {
        const inputUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
        const expectedReturnUnits = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
        inputUnits.forEach((unit, i) => {
            assert.equal(convertHandler.getReturnUnit(unit), expectedReturnUnits[i]);
        });
    });
//     #10
    test('Return the spelled-out string unit for each valid input unit', function() {
        let inputUnits = ['gal','l','mi','km','lbs','kg'];
        let expectUnits = ['gallons','liters','miles','kilometers','pounds', 'kilograms'];
        inputUnits.forEach((unit, i ) =>{
            assert.equal(convertHandler.spellOutUnit(unit), expectUnits[i]);
        })
    });
//     #11
    test('Convert gal to L.', function() {
        const input = 14;
        const expected = 52.9958;
        assert.approximately(convertHandler.convert(input,'gal'), expected,0.1);
    })
//     #12
    test('Convert L to gal', function() {
        const input = 12;
        const expect = 3.17006;
        assert.approximately(convertHandler.convert(input, 'L'), expect, 0.1);
    })
//     #13
    test('Convert mi to km', function() {
        const input = 5;
        const expect = 8.04672;
        assert.approximately(convertHandler.convert(input, 'mi'), expect, 0.1);
    })
//     #14
    test('Convert km to mi', function() {
        const input = 9;
        const expect = 5.59234;
        assert.approximately(convertHandler.convert(input, 'km'), expect, 0.1);
    })
//     #15
    test('Convert lbs to kg.', function() {
        const input = 60;
        const expect = 27.2155;
        assert.approximately(convertHandler.convert(input, 'lbs'), expect, 0.1);
    })
//     #16
    test('Convert kg to lbs.', function() {
        const input = 20;
        const expect = 44.0925;
        assert.approximately(convertHandler.convert(input, 'kg'), expect, 0.1);
    })

});