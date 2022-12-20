window.addEventListener('load', () => {

    let $ = (elemento) => document.querySelector(elemento)
    /*  console.log("login vinculado"); */

    const regExLetter = /^[A-Za-z]+$/i;
    const regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/;
    const regExEmail = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;

    let email = $('#email')
    let inputContrasenia = $('#contrasenia')
    /* let inputContrasenia2 = $('#contrasenia2') */ 

    let errores = [{
        id: 1,
        elemento: "email",
        mensaje: "Debe ingresar su email"
    }, {
        id: 2,
        elemento: "inputContrasenia",
        mensaje: "Debe ingresar una contraseña"
    }
    ]

    /* eyes */
    //van a quedar comentados para preguntar, este es el ojito.
    let eye = $('#eye-contrasenia') 
    /* let eye2 = $('#eye-contrasenia2') */ 

    eye.addEventListener('click', (e) => {
        inputContrasenia.type === 'password' ? inputContrasenia.type = 'text' : inputContrasenia.type = 'password'
        // console.log(eye.classList.contains('fa-eye-slash')) 
        if (eye.classList.contains('fa-eye-slash')) {
            eye.classList.toggle('fa-eye-slash')
            eye.classList.toggle('fa-eye')
        } else {
            eye.classList.toggle('fa-eye-slash')
            eye.classList.toggle('fa-eye')
        }
    })
    /*  eye2.addEventListener('click', (e) => {
        inputContrasenia2.type === 'password' ? inputContrasenia2.type = 'text' : inputContrasenia2.type = 'password'
        if (eye2.classList.contains('fa-eye-slash')) {
            eye2.classList.toggle('fa-eye-slash')
            eye2.classList.toggle('fa-eye')
        } else {
            eye2.classList.toggle('fa-eye-slash')
            eye2.classList.toggle('fa-eye')
        }
    })  */
    

    /* email */
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
                email.style.border = "3px solid var(--colorNaranja)"
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
                email.style.border = "3px solid var(--colorNaranja)"
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
                email.style.border = "3px solid var(--colorCeleste)"
                errores = errores.filter(error => {
                    return error.id !== 3
                })
                break;
        }
    })
    /* contraseña */
    inputContrasenia.addEventListener('blur', () => {
        let error = {
            id: 4,
            elemento: "inputContrasenia",
            mensaje: "Debe ingresar su contraseña"
        }
        let variable = true
        switch (true) {
            case !inputContrasenia.value:
                $('#contraseniaContainer').innerHTML = "<small>Debe ingresar su contraseña</small>"
                inputContrasenia.style.border = "3px solid var(--colorNaranja)"
                errores.forEach(e => {
                    if (e.id === 4) {
                        e.mensaje = "Debe ingresar su contraseña"
                        variable = false
                    }
                });
                if (variable) {
                    errores.push(error)
                }
                break;

                /* esta validacion deberia ir en el register */
            case !regExPass.test(inputContrasenia.value):
                $('#contraseniaContainer').innerHTML = "<small>La contraseña es invalida </small>"
                inputContrasenia.style.border = "3px solid var(--colorNaranja)"
                errores.forEach(e => {
                    if (e.id === 4) {
                        e.mensaje = "La contraseña es invalida"
                        variable = false
                    }
                });
                if (variable) {
                    errores.push(error)
                }
                break;
            default:
                $('#contraseniaContainer').innerHTML = ""
                inputContrasenia.style.border = "3px solid var(--colorCeleste)"
                errores = errores.filter(error => {
                    return error.id !== 4
                })
                break;
        }
    })




})