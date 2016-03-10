'use strict';

const expect = require('chai').expect;

module.exports = (testName, describes) => {
  let test = (values, valueToTest) => {
    if(testName.indexOf('to') > -1){

      let valuesExpectedIndex = 0;
      if(!valueToTest) valuesExpectedIndex = 1;
      console.log('values', values)
      let valueConverted = 0;
      values.forEach( (element, index) => {
        valueConverted = describes[valuesExpectedIndex].valuesExpected[index];
        console.log('valueConverted', valueConverted);
        it('testando: '+element+' com '+valueConverted,  () => {
          let validated = require('./../'+testName+'/'+testName)(element);
          if(valueToTest) expect(validated).to.deep.equal(describes[valuesExpectedIndex].valuesExpected[index]);
          else expect(validated).to.deep.not.equal(describes[valuesExpectedIndex].valuesExpected[index]);

        });
      });

    }
    else {
      values.forEach( (element, index) => {
        it('testando: '+element,  () => {
          let validated = require('./../'+testName+'/'+testName)(element);
          expect(validated).to.equal(valueToTest);
        });
      });
    }
  };
  if(describes[0].list) {
    const list = describes.splice(0,1)[0].list;
    test = (values, valueToTest) => {
      values.forEach( (element) => {
        it('testando: '+element,  () => {
          let validated = require('./../'+testName+'/'+testName)(element, list);
          expect(validated).to.equal(valueToTest);
        });
      });
    };
  }

  describe(testName, () => {
    describes.forEach( (element, index) => {
      if(element.type) {
        describe(element.message,  () => {
          test(element.values, element.type);
        });
      }
      else {
        console.log('aqui começa')
        describe(element.message,  () => {
          console.log('element.values', element.values)
          console.log('element.type', element.type)
          test(element.values, element.type);
        });
      }
      if(element.list) return true;
    });
  });
};