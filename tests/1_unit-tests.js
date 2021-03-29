const { expect } = require('chai');
const chai = require('chai');
let assert = chai.assert;
const { describe, it } = require('mocha')
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

describe('Unit Tests', function(){

  describe('#convertHandler', function(){
    it('should correctly read a whole number input', () => {
      const expected = convertHandler.getNum('123')
      assert.equal(expected, '123')
    })
    it('should correctly read a decimal number input', () => {
      const expected = convertHandler.getNum('1.5')
      assert.equal(1.5, expected)
    })
    it('should correctly read a fraction input', () => {
      const fractioned = convertHandler.getNum('1/5')
      assert.equal(fractioned, 0.2)
    })
    it('should correctly read a fractional input with a decimal', () => {
      const fractioned = convertHandler.getNum('5.4/3')
      assert.equal(1.8, fractioned)
    })
    it('should correctly return an error on a double-fraction ', () => {
      const invalidFraction = convertHandler.getNum('5/4/3')
      expect(invalidFraction).to.be.equal("invalid number and unit")
    })
    it('should correctly default to a numerical input of 1 when no numerical input is provided', () => {
      const converted = convertHandler.getNum('gal')
      expect(converted).to.be.equal('1gal')
      expect(convertHandler.getNum('2gal')).to.be.equal('2gal')
    })
    it('should correctly read each valid input unit', () => {
      const units = ['gal','km','lbs', 'kg','mi', 'L']
      expect(units.map(unt => convertHandler.getNum(unt))).all.members(
        units.map((unt) => `1${unt}`)
      )
    })
    
  })
  

});