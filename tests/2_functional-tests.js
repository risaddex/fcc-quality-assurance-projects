const chaiHttp = require('chai-http')
const chai = require('chai')
let assert = chai.assert
const server = require('../server')
const { it, describe } = require('mocha')

chai.use(chaiHttp)

suite('Functional Tests', async () => {
  
  it('should convert a valid input such as 10L: GET request to /api/convert', async () => {
    await chai
      .request(server)
      .get('/api/convert')
      .query({ input: '10L' })
      .then((res) => {
        assert.deepEqual(res.body, {
          initNum: 10,
          initUnit: 'L',
          returnNum: 2.64172,
          returnUnit: 'gal',
          string: '10 liters converts to 2.64172 gallons',
        })
      })
      .catch((err) => {
        throw err
      })
  })

  it('should not convert an invalid input such as 32g: GET request to /api/convert', async () => {
    await chai
      .request(server)
      .get('/api/convert')
      .query({ input: '32g' })
      .then((res) => {
        assert.equal(res.text, 'invalid unit')
      })
      .catch((err) => {
        throw err
      })
  })

  it('should not convert an invalid number such as 3/7.2/4kg: GET request to /api/convert', async () => {
    await chai
      .request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kg' })
      .then((res) => {
        assert.equal(res.text, 'invalid number')
      })
  })

  it('should not convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert', async () => {
    await chai
      .request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kilomegagram' })
      .then((res) => {
        assert.equal(
          res.status,
          200,
          'should be 200 - as we sended proposal text ?'
        )
        assert.equal(res.text, 'invalid number and unit')
      })
  })

  it('should convert with no number such as kg: GET request to /api/convert', async () => {
    await chai
      .request(server)
      .get('/api/convert')
      .query({ input: 'kg' })
      .then((res) => {
        assert.equal(res.status, 200)
        assert.deepEqual(res.body, {
          initNum: 1,
          initUnit: 'kg',
          returnNum: 2.20462,
          returnUnit: 'lbs',
          string: '1 kilograms converts to 2.20462 pounds',
        })
      })
  })
})
