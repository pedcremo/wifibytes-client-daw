const index=require('../src/index.js');
const $ = require('jquery');

beforeEach(()=> {
    // Set up our document body
  document.body.innerHTML =
  '<form>'+
  '<select id="selectPerson" name="selectPerson">'+  
  '       <!-- TO FILL --> '+
  '</select>	<br><br>'+
  '<div id="operands">'+
  '  Operand: <input type="number" name="foperand1"><br>'+
  '</div>'+
  '<button type="button" id="buttonNewOperand">New operand</button> <br>'+
  '<br>'+
  '<select id="selectFunction">'+
  '       <!-- TO FILL -->'+             
  '</select>'+	
  '<br><br>'+

  '<button type="button" id="buttonCalculate">CALCULTATE!</button>'+
  
   '</form>'+
'<h1 id="hResult">Result:</h1>';

function fakeDOMLoaded() {
  const fakeEvent = document.createEvent('Event');

  fakeEvent.initEvent('DOMContentLoaded', true, true);
  window.document.dispatchEvent(fakeEvent);
}

fakeDOMLoaded();
  
});

test('Primer test select Person list html tag is filled first time', () => {
  expect($('#selectPerson option').length).toBeGreaterThan(0);  
  expect($('#selectFunction option').length).toBeGreaterThan(0);   
});


test('Second test we check adding new operand inputs is working', () => {
  //At the beginning only one input is present
  expect($('#operands input').length).toBe(1);
  // Use jquery to emulate a click on our button  
  $('#buttonNewOperand').click();
  //After clicking we get two operand inputs
  expect($('#operands input').length).toBe(2);
});
