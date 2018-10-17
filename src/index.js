import {get} from './utils';

let host='http://127.0.0.1';
let port='8080';

get(host+':'+port+'/datos_empresa').then(function(response) {
    console.log("Success!", response);
  }).catch(function(error) {
    console.log("Failed!", error);
})