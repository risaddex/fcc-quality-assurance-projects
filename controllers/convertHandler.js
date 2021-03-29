function ConvertHandler() {
  
  this.getNum = function(input) {
    let result
    // handle invalid fractions
    if ((/\d+\/\d+\/\d+/).test(input)) {
      return "invalid number and unit"
    }
    // eval fractions
    if (/\d+\/\d+/.test(input)) {
      return eval(input)
    }
    // eval decimal fractions
    if ((/\d+\.\d+\/\d+/).test(input)) {
      return eval(input)
    }
    // match standalone units and give them value 1
    if ((/^(gal|km|lbs|kg|mi|l)$/i.test(input))) {
      return `1${input}`
    }
    return input
  };
  
  this.getUnit = function(input) {
    let result;
    
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
