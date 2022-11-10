window.addEventListener('load', () => {

    let $ = (elemento) => document.querySelector(elemento)
    console.log("Register vinculado");

    const regExLetter = /^[A-Z]+$/;

    

    let formulario = $('#formulario')
    let nombre = $('#nombre')
    let apellido = $('#apellido')

    let errores = [{
        id: 1,
        elemento:"nombre",
        mensaje: "El Nombre es obligatorio"
    },{
        id: 2,
        elemento:"apellido",
        mensaje: "El apellido es obligatorio"
    },]


    nombre.addEventListener('blur',() => {
        let error = {
            id: 1,
            elemento:"nombre",
            mensaje: "El Nombre es obligatorio"
        }
        let variable = true
        switch (true) {
            case !nombre.value:
                $('#nameContainer').innerHTML = "<small>El Nombre es obligatorio</small>"
                nombre.style.border = "1px solid red"
                errores.forEach(e => {
                    if(e.id === 1 ){
                        e.mensaje = "El Nombre es obligatorio"
                        variable = false
                    }
                });
                if (variable) {
                    errores.push(error)
                }
                break;
            case regExLetter.test(nombre.value):
                $('#nameContainer').innerHTML = "<small>El Nombre solo acepta letras</small>"
                nombre.style.border = "1px solid red"
                errores.forEach(e => {
                    if(e.id === 1 ){
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
     apellido.addEventListener('blur',() => {
        let error = {
            id: 2,
            elemento:"apellido",
            mensaje: "Falta el apellido"
        }
        let variable = true
        switch (true) {
            case !apellido.value:
                $('#apellidoContainer').innerHTML = "<small>El apellido es obligatorio</small>"
                apellido.style.border = "1px solid red"
                errores.forEach(e => {
                    if(e.id === 2 ){
                        e.mensaje = "El apellido es obligatorio"
                        variable = false
                    }
                });
                if (variable) {
                    errores.push(error)
                }
                break;
            case regExLetter.test(apellido.value):
                $('#apellidoContainer').innerHTML = "<small>El apellido no puede contener numeros ni caracteres especiales</small>"
                nombre.style.border = "1px solid red"
                errores.forEach(e => {
                    if(e.id === 2 ){
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



});