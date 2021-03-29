function ConvertHandler() {
  // gets foo.bar/baz
  const regex1 = /^(\d+)?(\.\d+)?(\/\d+)?(gal|km|lbs|kg|mi|L)$/i;
  // gets foo/baz.bar
  const regex2 = /^(\d+)?(\/\d+)?(\.\d+)?(gal|km|lbs|kg|mi|L)$/i;
  // gets valid units
  const unitRegex = /(gal|km|lbs|kg|mi|L)$/i;

  this.getNum = function (input) {
    let result;
    // match standalone units and give them value 1
    if (/^(gal|km|lbs|kg|mi|L)$/i.test(input)) {
      return 1;
    }

    if (regex1.test(input) || regex2.test(input)) {
      return eval(input.replace(unitRegex, ""));
    }
    return "invalid number";
  };

  this.getUnit = function (input) {
    let result = /(gal|km|lbs|kg|mi|^l$)$|(\d+)?\.?\d+l$/i.test(
      input.toLowerCase()
    );
    if (!result) return "invalid unit";

    let unit = input.replace(/\W+|\d+/g, "");
    return unit.length >= 2 ? unit.toLowerCase() : unit.toUpperCase();
  };

  this.getReturnUnit = function (initUnit) {
    const entry = this.getUnit(initUnit);
    const entryMap = new Map([
      ["gal", "L"],
      ["mi", "km"],
      ["lbs", "kg"],
      ["L", "gal"],
      ["km", "mi"],
      ["kg", "lbs"],
    ]);

    return entryMap.get(entry);
  };
  this.spellOutUnit = function (unit) {
    const abbreviated = ['gal', 'km', 'lbs', 'kg', 'mi', 'L']
    const spelledOut = ['gallons', 'kilometers', 'pounds', 'kilograms', 'miles', 'liters']


    return spelledOut[abbreviated.indexOf(unit)]
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    let result
    switch (initUnit) {
      case 'gal':
        result = [initNum * galToL, 'L']
        break
      case 'L':
        result = [initNum / galToL, 'gal']
        break
      case 'lbs':
        result = [initNum * lbsToKg, 'kg']
        break
      case 'kg':
        result = [initNum / lbsToKg, 'lbs']
        break
      case 'mi':
        result = [initNum * miToKm, 'km']
        break
      case 'km':
        result = [initNum / miToKm, 'mi']
        break
      default:
        throw new Error('invalid unit')
    }

    const [num, str] = result

    return [num.toFixed(5), str]

  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;

    return result;
  };
}

module.exports = ConvertHandler;
