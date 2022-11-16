window.addEventListener('load', () => {

    let $ = (elemento) => document.querySelector(elemento)
    /*  console.log("Register vinculado"); */
 
     const regExLetter = /^[A-Za-z]+$/i;
     /* /^[A-Z]+$/ */
     const regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/;
     const regExEmail = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;
 
    let email = $('#email')
    let inputContrasenia = $('#contrasenia')

    let errores = [{
        id: 1,
        elemento: "email",
        mensaje: "Debe ingresar su email"
    }, {
        id: 2,
        elemento: "inputContrasenia",
        mensaje: "Debe ingresar una contraseña"
    }, /* {
        id: 3,
        elemento: "inputContrasenia",
        mensaje: "el email y la contraseña no coinciden"
    } */
]
    email.addEventListener('blur', () => {
    let error = {
        id: 3,
        elemento: "email",
        mensaje: "Debe ingresar su email"
    }
    let variable = true
    switch (true) {
        case !email.value:
            $('#emailContainer').innerHTML = "<small>Debe ingresar su email</small>"
            email.style.border = "1px solid red"
            errores.forEach(e => {
                if (e.id === 3) {
                    e.mensaje = "Debe ingresar un email"
                    variable = false
                }
            });
            if (variable) {
                errores.push(error)
            }
            break;
        case !regExEmail.test(email.value):
            $('#emailContainer').innerHTML = "<small>El email no coincide con un email valido</small>"
            email.style.border = "1px solid red"
            errores.forEach(e => {
                if (e.id === 3) {
                    e.mensaje = "El email no coincide con un email valido"
                    variable = false
                }
            });
            if (variable) {
                errores.push(error)
            }
            break;
        default:
            $('#emailContainer').innerHTML = ""
            email.style.border = "1px solid green"
            errores = errores.filter(error => {
                return error.id !== 3
            })
            break;
        }})
        
        inputContrasenia.addEventListener('blur', () => {
            let error = {
                id: 4,
                elemento: "inputContrasenia",
                mensaje: "Debe ingresar una contraseña"
            }
            let variable = true
            switch (true) {
                case !inputContrasenia.value:
                    $('#contraseniaContainer').innerHTML = "<small>Debe ingresar una contraseña</small>"
                    inputContrasenia.style.border = "1px solid red"
                    errores.forEach(e => {
                        if (e.id === 4) {
                            e.mensaje = "Debe ingresar una contraseña"
                            variable = false
                        }
                    });
                    if (variable) {
                        errores.push(error)
                    }
                    break;
                case !regExPass.test(inputContrasenia.value):
                    $('#contraseniaContainer').innerHTML = "<small>Debe contener al menos 8 caracteres </small>"
                    inputContrasenia.style.border = "1px solid red"
                    errores.forEach(e => {
                        if (e.id === 4) {
                            e.mensaje = "Debe contener al menos 8 caracteres"
                            variable = false
                        }
                    });
                    if (variable) {
                        errores.push(error)
                    }
                    break;
                default:
                    $('#contraseniaContainer').innerHTML = ""
                    inputContrasenia.style.border = "1px solid green"
                    errores = errores.filter(error => {
                        return error.id !== 4
                    })
                    break;
            }
        })
        
    

    
})