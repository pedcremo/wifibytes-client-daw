const regexEmail = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/

const regexZip = /^(?:0[1-9]\d{3}|[1-4]\d{4}|5[0-2]\d{3})$/

const regexPhone = /^[9|6]{1}([\d]{2}[-]*){3}[\d]{2}$/


export function validator(param, name, type="text") {
    console.warn(param, type)
    if (param.length==0) 
        return "This field is required"

    switch (type) {
        
        case "text":
            if (param.length < 3 && (name === "name" || name === "surname" || name === "city"))
                return "This field has minus of 3 params"
            
            if (param.length < 7 && name === "address")
                return "This field has minus of 7 params"

            break;

        case "email":
            if (!regexEmail.test(param))
            return "This is not a valid email"
        break;
        
        case "number":
            if (name === "phone" && !regexPhone.test(param))
                return "This is not a valid phone"

            if (name === "zip" && !regexZip.test(param))
                return "This is not a valid zip"
            break;

    
        default:
            return true
            break;
    }
    
}

