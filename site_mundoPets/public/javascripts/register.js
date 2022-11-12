window.addEventListener('load', () => {

    let $ = (elemento) => document.querySelector(elemento)
    console.log("Register vinculado");

    const regExLetter = /^[A-Za-z]+$/i;
    /* /^[A-Z]+$/ */
    const regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;
    const regExEmail = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;


    let formulario = $('#formulario')
    let nombre = $('#nombre')
    let apellido = $('#apellido')
    let email = $('#email')
    let inputContrasenia = $('#contrasenia')
    let inputContrasenia2 = $('#contrasenia2')

    let errores = [{
        id: 1,
        elemento: "nombre",
        mensaje: "El Nombre es obligatorio"
    }, {
        id: 2,
        elemento: "apellido",
        mensaje: "El apellido es obligatorio"
    }, {

        id: 3,
        elemento: "email",
        mensaje: "Debe ingresar su email"
    }, {
        id: 4,
        elemento: "inputContrasenia",
        mensaje: "Debe ingresar una contraseña"
    }, {
        id: 5,
        elemento: "inputContrasenia2",
        mensaje: "Debe confirmar su contraseña"
    }
    ]


    let eye = $('#eye-contrasenia')
    let eye2 = $('#eye-contrasenia2')

    eye.addEventListener('click', (e) => {
        inputContrasenia.type === 'password' ? inputContrasenia.type = 'text' : inputContrasenia.type = 'password'
        console.log(eye.classList.contains('fa-eye-slash'))
        if (eye.classList.contains('fa-eye-slash')) {
            eye.classList.toggle('fa-eye-slash')
            eye.classList.toggle('fa-eye')
        } else {
            eye.classList.toggle('fa-eye-slash')
            eye.classList.toggle('fa-eye')
        }
    })

    eye2.addEventListener('click', (e) => {
        inputContrasenia2.type === 'password' ? inputContrasenia2.type = 'text' : inputContrasenia2.type = 'password'
        if (eye2.classList.contains('fa-eye-slash')) {
            eye2.classList.toggle('fa-eye-slash')
            eye2.classList.toggle('fa-eye')
        } else {
            eye2.classList.toggle('fa-eye-slash')
            eye2.classList.toggle('fa-eye')
        }
    })






    nombre.addEventListener('blur', () => {
        let error = {
            id: 1,
            mensaje: "El Nombre es obligatorio"
        }
        let variable = true
        switch (true) {
            case !nombre.value:
                $('#nameContainer').innerHTML = "<small>El Nombre es obligatorio</small>"
                nombre.style.border = "1px solid red"
                errores.forEach(e => {
                    if (e.id === 1) {
                        e.mensaje = "El Nombre es obligatorio"
                        variable = false
                    }
                });
                if (variable) {
                    errores.push(error)
                }
                break;

            /* case !nombre.value:
                $('#nameContainer').innerHTML = "<small>El Nombre debe contener al menos dos caracteres</small>"
                nombre.style.border = "1px solid red"
                errores.forEach(e => {
                    if(e.id === 1 ){
                        e.mensaje = "El Nombre debe contener al menos dos caracteres"
                        variable = false
                    }
                });
                if (variable) {
                    errores.push(error)
                }
                break; */

            case !regExLetter.test(nombre.value):
                $('#nameContainer').innerHTML = "<small>El Nombre solo acepta letras</small>"
                nombre.style.border = "1px solid red"
                errores.forEach(e => {
                    if (e.id === 1) {
                        e.mensaje = "El Nombre solo acepta letras"
                        variable = false
                    }
                });
                if (variable) {
                    errores.push(error)
                }
                break;
            default:
                $('#nameContainer').innerHTML = ""
                nombre.style.border = "1px solid green"
                errores = errores.filter(error => {
                    return error.id !== 1
                })
                break;
        }
        console.log(errores);
    })
    apellido.addEventListener('blur', () => {
        let error = {
            id: 2,
            elemento: "apellido",
            mensaje: "El apellido es obligatorio"
        }
        let variable = true
        switch (true) {
            case !apellido.value:
                $('#apellidoContainer').innerHTML = "<small>El apellido es obligatorio</small>"
                apellido.style.border = "1px solid red"
                errores.forEach(e => {
                    if (e.id === 2) {
                        e.mensaje = "El apellido es obligatorio"
                        variable = false
                    }
                });
                if (variable) {
                    errores.push(error)
                }
                break;
            case !regExLetter.test(apellido.value):
                $('#apellidoContainer').innerHTML = "<small>El apellido no puede contener numeros ni caracteres especiales</small>"
                nombre.style.border = "1px solid red"
                errores.forEach(e => {
                    if (e.id === 2) {
                        e.mensaje = "El apellido no puede contener numeros ni caracteres especiales"
                        variable = false
                    }
                });
                if (variable) {
                    errores.push(error)
                }
                break;
            default:
                $('#apellidoContainer').innerHTML = ""
                apellido.style.border = "1px solid green"
                errores = errores.filter(error => {
                    return error.id !== 2
                })
                break;
        }
    })
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
        }
        console.log(errores);
    })
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
    inputContrasenia2.addEventListener('blur', () => {
        let error = {
            id: 5,
            elemento: "inputContrasenia2",
            mensaje: "Debe confirmar su contraseña"
        }
        let variable = true

        switch (true) {
            case !inputContrasenia2.value:
                $('#contraseniaContainer2').innerHTML = "<small>Debe confirmar su contraseña</small>"
                inputContrasenia2.style.border = "1px solid red"
                error.mensaje = "Debe confirmar su contraseña"
                errores.forEach(e => {
                    if (e.id === 5) {
                        e.mensaje = "Debe confirmar su contraseña"
                        variable = false
                    }
                });
                if (variable) {
                    errores.push(error)
                }

                break;
            case inputContrasenia2.value != inputContrasenia.value:
                $('#contraseniaContainer2').innerHTML = "<small>Las contraseñas no coinciden</small>"
                error.mensaje = "Las contraseñas no coinciden"
                inputContrasenia2.style.border = "1px solid red"
                errores.forEach(e => {
                    if (e.id === 5) {
                        variable = false
                    }
                });

                if (variable) {
                    errores.push(error)
                }

                break;
            default:
                $('#contraseniaContainer2').innerHTML = ""
                inputContrasenia2.style.border = "1px solid green"
                errores = errores.filter(error => {
                    return error.id !== 5
                })
                break;
        }
    })



});










   
