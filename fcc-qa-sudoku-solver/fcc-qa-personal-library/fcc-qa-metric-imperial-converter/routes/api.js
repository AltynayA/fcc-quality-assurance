'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  app.route('/api/convert').get((req,res)=> {
    var input = req.query.input;
    var initialNum = convertHandler.getNum(input);
    var initialUnit = convertHandler.getUnit(input);
    var returnNum = convertHandler.convert(initialNum,initialUnit);
    var returnUnit = convertHandler.getReturnUnit(initialUnit);
    var toString = convertHandler.toString(initialNum,initialUnit,returnNum,returnUnit);
    if (initialNum === 'invalid number' && initialUnit === 'invalid unit') {
      res.json('invalid number and unit');
    } else if (initialNum === 'invalid number') {
      res.json('invalid number');
    } else if (initialUnit === 'invalid unit') {
      res.json('invalid unit');
    } else {
      const returnNum = convertHandler.convert(initialNum, initialUnit);
      const returnUnit = convertHandler.getReturnUnit(initialUnit);
      const toString = convertHandler.toString(initialNum, initialUnit, returnNum, returnUnit);
      // if(initialNum === 'invalid number' && initialUnit === 'invalid unit') {
      //   // res.json('invalid number and unit')
      //   res.status(200).type('text').send('invalid number and unit');
      // }
      // if(initialNum === 'invalid number') {
      //   // res.json('invalid number')
      //   res.status(200).type('text').send('invalid number')
      // }
      // if(returnUnit === 'invalid unit') {
      //   // res.json('invalid unit');
      //   res.status(200).type('text').send('invalid unit');
      // }
      let responseObject = {}
      responseObject['initNum'] = initialNum
      responseObject['initUnit'] = initialUnit
      responseObject['returnNum'] = returnNum
      responseObject['returnUnit'] = returnUnit
      responseObject['string'] = toString
      res.json(responseObject)
    }
  });
};
