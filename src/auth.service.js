import {Utils} from './utils';

let AuthService = {
    isAuth:function(){
        return new Promise(function(resolve, reject) {
            let token = Utils.getCookie("tokenAuth");
            if(token == "") reject(Error("No token"));
            Utils.post("/api-token-verify/",{'token':token}).then(function(res){
                res = JSON.parse(res);
                if(!Utils.getCookie("tokenAuth") || Utils.getCookie("tokenAuth") != res.token){
                    Utils.setCookie("tokenAuth",res.token,365)
                }
                resolve(res);
            }).catch((err)=>{
                reject(Error(err));
            });
        });
    },
    login:function(data){
        return new Promise(function(resolve, reject) {
            if(!data.username) reject("No username");
            if(!data.password) reject("No password");

            Utils.post("/api-token-auth/",data).then(function(res){
                console.log(res)
                res = JSON.parse(res);
                console.log(res)
                if(!Utils.getCookie("tokenAuth") || Utils.getCookie("tokenAuth") != res.token){
                    Utils.setCookie("tokenAuth",res.token,365)
                }
                resolve(res);
            }).catch((err)=>{
                reject(err);
            });
        });
    },
    register:function(data){
        return new Promise(function(resolve, reject) {
            if(!data.nombre) reject("No nombre");
            if(!data.apellido) reject("No apellido");
            if(!data.email) reject("No email");
            if(!data.cifnif) reject("No cifnif");
            if(!data.password) reject("No password");

            Utils.post("/cliente/",data).then(function(res){
                res = JSON.parse(res);
                if(!Utils.getCookie("tokenAuth") || Utils.getCookie("tokenAuth") != res.token){
                    Utils.setCookie("tokenAuth",res.token,365)
                }
                resolve(res);
            }).catch((err)=>{
                reject(err);
            });
        })
    },
    logout:function(){
        Utils.deleteCookie("tokenAuth")
    },
    recoverPass:function(diccionario){
        return new Promise(function(resolve, reject) {
            if(!diccionario.email) reject(Error("No email"));
            
            Utils.post("/clientenoreg/",diccionario)
            .then(function(res){
                resolve(res)
            })
            .catch((err)=>{
                reject(err)
            })
        });
    }
}
let that = AuthService;
export {AuthService};