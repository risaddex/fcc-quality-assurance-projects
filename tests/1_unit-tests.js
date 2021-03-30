const chai = require('chai')
let assert = chai.assert
const { describe, it } = require('mocha')
const ConvertHandler = require('../controllers/convertHandler.js')

let convertHandler = new ConvertHandler()

describe('Unit Tests', () => {
  describe('#inputs', () => {
    it('should correctly read a whole number input', () => {
      const whole = convertHandler.getNum('123l')
      assert.equal(whole, 123)
    })
    it('should correctly read a decimal number input', () => {
      const decimal = convertHandler.getNum('1.5gal')
      assert.equal(decimal, 1.5)
    })
    it('should correctly read a fraction input', () => {
      const fractioned = convertHandler.getNum('1/5gal')
      assert.equal(fractioned, 0.2)
    })
    it('should correctly read a fractional input with a decimal', () => {
      const fractionedDecimal = convertHandler.getNum('5.4/3gal')
      assert.equal(1.8, fractionedDecimal)
    })
    it('should correctly return an error on a double-fraction ', () => {
      const invalidFraction = convertHandler.getNum('5/4/3gal')
      assert.equal(invalidFraction, 'invalid number')
    })
    it('should correctly default to a numerical input of 1 when no numerical input is provided', () => {
      const converted = convertHandler.getNum('gal')
      assert.equal(converted, 1)
      assert.equal(convertHandler.getNum('2gal'), 2)
    })
    it('should correctly read each valid input unit', () => {
      const units = ['gal', '2km', '4.5lbs', '3.4/7KG', '0.33mi', '1/1i', '43l']
      const expected = ['gal', 'km', 'lbs', 'kg', 'mi', 'invalid unit', 'L']
      assert.sameMembers(
        units.map((unt) => convertHandler.getUnit(unt)),
        expected
      )
    })
    it('should correctly return an error for an invalid input unit', () => {
      const invalidUnits = ['gel', 'kn', 'ibs', 'ml', 'gr']
      const expected = invalidUnits.map((unt) => convertHandler.getUnit(unt))
      assert.sameMembers(expected, Array(5).fill('invalid unit'))
    })
    it('should return the correct return unit for each valid input unit', () => {
      const values = ['1gal', '2.3L', '5.4/3KM', '423/3.2MI', '0.7lbs', '150Kg']
      const expected = ['L', 'gal', 'mi', 'km', 'kg', 'lbs']
      const result = values.map((val) => convertHandler.getReturnUnit(val))
      assert.sameMembers(result, expected)
    })
    it('should correctly return the spelled-out string unit for each valid input unit', () => {
      const abbreviated = ['gal', 'km', 'lbs', 'kg', 'mi', 'L']
      const spelledOut = [
        'gallons',
        'kilometers',
        'pounds',
        'kilograms',
        'miles',
        'liters',
      ]
      assert.sameMembers(
        abbreviated.map((val) => convertHandler.spellOutUnit(val)),
        spelledOut
      )
    })
  })

  describe('#conversions', () => {
    const convert = (entry, unit) => convertHandler.convert(entry, unit)
    it('should correctly convert gal to L', () => {
      assert.sameMembers(
        convert('1', 'gal'),
        ['3.78541', 'L'],
        'both members should be equal'
      )
    })
    it('convertHandler should correctly convert L to gal', () => {
      assert.sameMembers(convert(1.59, 'L'), ['0.42003', 'gal'])
    })
    it('should correctly convert mi to km', () => {
      assert.sameMembers(convert(4, 'mi'), ['6.43736', 'km'])
    })
    it('should correctly convert km to mi', () => {
      assert.sameMembers(convert(0.5, 'km'), ['0.31069', 'mi'])
    })
    it('should correctly convert lbs to kg', () => {
      assert.sameMembers(convert(3.5, 'lbs'), ['1.58757', 'kg'])
    })
    it('should correctly convert kg to lbs', () => {
      assert.sameMembers(convert(4 / 15, 'kg'), ['0.58790', 'lbs'])
    })
  })
})
