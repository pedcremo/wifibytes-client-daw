import {Utils} from './utils';

let AuthService = {
    isAuth:function(){
        return new Promise(function(resolve, reject) {
            let token = Utils.getCookie("tokenAuth");
            if(!token) reject(Error("No token"));
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
            if(!data.username) reject(Error("No username"));
            if(!data.password) reject(Error("No password"));

            Utils.post("/api-token-auth/",data).then(function(res){
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
    register:function(data){
        return new Promise(function(resolve, reject) {
            if(!data.nombre) reject(Error("No nombre"));
            if(!data.apellido) reject(Error("No apellido"));
            if(!data.email) reject(Error("No email"));
            if(!data.cifnif) reject(Error("No cifnif"));
            if(!data.password) reject(Error("No password"));
    
            Utils.post("/cliente/",register).then(function(res){
                res = JSON.parse(res);
                resolve(res);
            }).catch((err)=>{
                reject(Error(err));
            });
        })
    },
    logout:function(){
        Utils.deleteCookie("tokenAuth")
    }
}
let that = AuthService;
export {AuthService};