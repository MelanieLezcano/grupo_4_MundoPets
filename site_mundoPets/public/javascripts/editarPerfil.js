window.addEventListener('load', () => {

    let $ = (elemento) => document.querySelector(elemento)
    /*  console.log("Register vinculado"); */

    const funcValidate = (obj) => {
        let arr = Object.values(obj)
        console.log(arr);
        if (!arr.includes(false)) {
            btn.disabled = false
            btn.style.backgroundColor = 'var(--colorAzulFrancia)'
        } else {
            btn.disabled = true
            btn.style.backgroundColor = 'var(--colorCeleste)'
        }
    }

    
    const regExLetter = /^[A-Za-z]+$/i;
    /* /^[A-Z]+$/ */
    const regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/;
    const regExExt = /\.(jpg|jpeg|png|jfif|gif|webp)$/


    let formulario = $('#formulario')
    let nombre = $('#nombre')
    let apellido = $('#apellido')
    let contacto = $('#contacto')
    let ciudad = $('#ciudad')
    let genero = $('#genero')
    let image = $('#image')

    let errores = [{
        id: 1,
        elemento: "nombre",
        mensaje: "Debe ingresar su nombre"
    }, {
        id: 2,
        elemento: "apellido",
        mensaje: "Debe ingresar su apellido"
    }, {
        id: 3,
        elemento: "contacto",
        mensaje: "Debe ingresar un contacto"
    }, {
        id: 4,
        elemento: "ciudad",
        mensaje: "Debe ingresar una ciudad"
    }, {
        id: 5,
        elemento: "genero",
        mensaje: "Debe ingresar un genero"
    }]

    nombre.addEventListener('blur', () => {
        let error = {
            id: 1,
            mensaje: "Debe ingresar su nombre"
        }
        let variable = true
        switch (true) {
            case !nombre.value:
                $('#nameContainer').innerHTML = "<small>Debe ingresar su nombre</small>"
                nombre.style.border = "1px solid red"
                errores.forEach(e => {
                    if (e.id === 1) {
                        e.mensaje = "Debe ingresar su nombre"
                        variable = false
                    }
                });
                if (variable) {
                    errores.push(error)
                }
                break;
    
            case !regExLetter.test(nombre.value):
                $('#nameContainer').innerHTML = "<small>El nombre no puede contener menos de 2 caracteres,ni caracteres especiales </small>"
                nombre.style.border = "1px solid red"
                errores.forEach(e => {
                    if (e.id === 1) {
                        e.mensaje = "El nombre no puede contener menos de 2 caracteres,ni caracteres especiales "
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
        
        /* console.log(errores); */
    })

    apellido.addEventListener('blur', () => {
        let error = {
            id: 2,
            elemento: "apellido",
            mensaje: "Debe ingresar su apellido"
        }
        let variable = true
        switch (true) {
            case !apellido.value:
                $('#apellidoContainer').innerHTML = "<small>Debe ingresar su apellido</small>"
                apellido.style.border = "1px solid red"
                errores.forEach(e => {
                    if (e.id === 2) {
                        e.mensaje = "Debe ingresar su apellido"
                        variable = false
                    }
                });
                if (variable) {
                    errores.push(error)
                }
                break;
            case !regExLetter.test(apellido.value):
                $('#apellidoContainer').innerHTML = "<small>El apellido no puede contener menos de 2 caracteres,ni caracteres especiales</small>"
                nombre.style.border = "1px solid red"
                errores.forEach(e => {
                    if (e.id === 2) {
                        e.mensaje = "El apellido no puede contener menos de 2 caracteres,ni caracteres especiales"
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

    contacto.addEventListener('blur', () => {
        let error = {
            id: 3,
            elemento: "contacto",
            mensaje: "Debe ingresar un contacto"
        }
        let variable = true
        switch (true) {
            case !contacto.value:
                $('#contactoContainer').innerHTML = "<small>Debe ingresar un contacto</small>"
                contacto.style.border = "1px solid red"
                errores.forEach(e => {
                    if (e.id === 2) {
                        e.mensaje = "Debe ingresar un contacto"
                        variable = false
                    }
                });
                if (variable) {
                    errores.push(error)
                }
                break;
            case !regExLetter.test(contacto.value):
                $('#contactoContainer').innerHTML = "<small>El contacto no puede contener menos de 2 caracteres,ni caracteres especiales</small>"
                contacto.style.border = "1px solid red"
                errores.forEach(e => {
                    if (e.id === 2) {
                        e.mensaje = "El contacto no puede contener menos de 2 caracteres,ni caracteres especiales"
                        variable = false
                    }
                });
                if (variable) {
                    errores.push(error)
                }
                break;
            default:
                $('#contactoContainer').innerHTML = ""
                contacto.style.border = "1px solid green"
                errores = errores.filter(error => {
                    return error.id !== 2
                })
                break;
        }
        
    })

    ciudad.addEventListener('blur', () => {
        let error = {
            id: 4,
            elemento: "ciudad",
            mensaje: "Debe ingresar una ciudad"
        }
        let variable = true
        switch (true) {
            case !ciudad.value:
                $('#ciudadContainer').innerHTML = "<small>Debe ingresar una ciudad</small>"
                ciudad.style.border = "1px solid red"
                errores.forEach(e => {
                    if (e.id === 2) {
                        e.mensaje = "Debe ingresar una ciudad"
                        variable = false
                    }
                });
                if (variable) {
                    errores.push(error)
                }
                break;
            case !regExLetter.test(ciudad.value):
                $('#ciudadContainer').innerHTML = "<small>La ciudad no puede contener menos de 2 caracteres,ni caracteres especiales</small>"
                ciudad.style.border = "1px solid red"
                errores.forEach(e => {
                    if (e.id === 2) {
                        e.mensaje = "La ciudad no puede contener menos de 2 caracteres,ni caracteres especiales"
                        variable = false
                    }
                });
                if (variable) {
                    errores.push(error)
                }
                break;
            default:
                $('#ciudadContainer').innerHTML = ""
                ciudad.style.border = "1px solid green"
                errores = errores.filter(error => {
                    return error.id !== 2
                })
                break;
        }
        
    })

    genero.addEventListener('blur', () => {
        let error = {
            id: 5,
            elemento: "genero",
            mensaje: "Debe ingresar su apellido"
        }
        let variable = true
        switch (true) {
            case !genero.value:
                $('#generoContainer').innerHTML = "<small>Debe ingresar un genero</small>"
                genero.style.border = "1px solid red"
                errores.forEach(e => {
                    if (e.id === 2) {
                        e.mensaje = "Debe ingresar un genero"
                        variable = false
                    }
                });
                if (variable) {
                    errores.push(error)
                }
                break;
            case !regExLetter.test(genero.value):
                $('#generoContainer').innerHTML = "<small>El genero no puede contener menos de 2 caracteres,ni caracteres especiales</small>"
                nombre.style.border = "1px solid red"
                errores.forEach(e => {
                    if (e.id === 2) {
                        e.mensaje = "El apellido no puede contener menos de 2 caracteres,ni caracteres especiales"
                        variable = false
                    }
                });
                if (variable) {
                    errores.push(error)
                }
                break;
            default:
                $('#generoContainer').innerHTML = ""
                apellido.style.border = "1px solid green"
                errores = errores.filter(error => {
                    return error.id !== 2
                })
                break;
        }
        
    })

    

    image.addEventListener('change', function () {
        switch (true) {
            case !regExExt.exec(image.value):
                $('#imgError').innerHTML = "Solo se permite ingresar una image valida formato (jpg|jpeg|png|jfif|gif|webp)"
                validate.image = false
                break;
            default:
                $('#imgError').innerHTML = null
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                validate.image = true
                break;
        }
        funcValidate(validate)


        const validate = {
            image: true,
        }
    })

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        console.log(formulario.elements);
        if (errores.length > 0) {
            formulario.submit()
        }
    })

});