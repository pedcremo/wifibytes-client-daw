import {get} from './utils';

let hostBase='http://127.0.0.1:8000';


get(hostBase+'/datos_empresa').then(function(response) {
    console.log("Success!", response);
    document.getElementById("result").innerHTML = response;
  }).catch(function(error) {
    console.log("Failed!", error);
})