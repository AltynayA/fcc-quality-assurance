let inputRegex = /[a-z]+|[^a-z]+/gi

function ConvertHandler() {
  this.getNum = function(input) {
    const match = input.match(inputRegex);
    if (!match) return 'invalid number';

    const numPart = match[0];
    // default to 1
    if (/^[a-z]+$/i.test(numPart)) {
      return 1;
    }
    if (numPart.includes('/')) {
      const values = numPart.split('/');
      if (values.length !== 2) {
        return 'invalid number';
      }
      return parseFloat((parseFloat(values[0]) / parseFloat(values[1])).toFixed(5));
    }

    return parseFloat(numPart);
    // // return all matched with regex in array
    // let result = input.match(inputRegex)[0];
    // if (!result || /^[a-z]+$/i.test(result)) {
    //   return 1;
    // }
    // // handle the fraction
    // if (result.includes('/')) {
    //   const values = result.split('/');
    //   // allow only one slash for valid fraction
    //   if (values.length !== 2) {
    //     return 'invalid number';
    //   }
    //   result = parseFloat((parseFloat(values[0]) / parseFloat(values[1])).toFixed(5));
    // } else {
    //   result = parseFloat(result);
    // }
    // return result;
  };
  
  this.getUnit = function(input) {
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    const matches = input.match(inputRegex);
    if (!matches) return 'invalid unit';

    let unit = matches.length === 1 ? matches[0] : matches[1];
    let resultLower = unit.toLowerCase();
    if (!validUnits.includes(resultLower)) return 'invalid unit';
    return resultLower === 'l' ? 'L' : resultLower;

  };
  
  this.getReturnUnit = function(initUnit) {
    if (!initUnit || typeof initUnit !== 'string') return 'invalid unit';

    const unitMap = {
      gal: 'L',
      l: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };

    const key = initUnit.toLowerCase() === 'l' ? 'l' : initUnit.toLowerCase();
    const returnUnit = unitMap[key];
    return returnUnit ? (returnUnit === 'l' ? 'L' : returnUnit) : 'invalid unit';
  };
  this.spellOutUnit = function(unit) {
    const spellMap = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };
    const normalizedUnit = unit.toLowerCase() === 'l' ? 'L' : unit.toLowerCase();
    return spellMap[normalizedUnit];
  };
  
  this.convert = function(initNum, initUnit) {

    const conversionRates = {
      gal: 3.78541,
      L: 1 / 3.78541,
      lbs: 0.453592,
      kg: 1 / 0.453592,
      mi: 1.60934,
      km: 1 / 1.60934
    };
    const rate = conversionRates[initUnit];
    if (!rate) return 'invalid input';
    const result = initNum * rate;
    return parseFloat(result.toFixed(5));
  };
  
  this.toString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = initNum + ' ' + this.spellOutUnit(initUnit) + ' converts to ' +  returnNum+ ' ' + this.spellOutUnit(returnUnit)
    return result;
  };
  
}

module.exports = ConvertHandler;
