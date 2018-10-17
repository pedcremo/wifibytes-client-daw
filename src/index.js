import {get} from './utils';

let hostBase='https://backend.wifibytes.com/';


get(hostBase+'/datos_empresa').then(function(response) {
    console.log("Success!", response);
    document.getElementById("result").innerHTML = response;
  }).catch(function(error) {
    console.log("Failed!", error);
})