window.addEventListener('load', () => {
    const $ = (tag) => document.querySelector(tag)
    const id = (tag) => document.getElementById(tag)

    let titulo = $('#titulo')
    let precio = $('#precio')
    let descuento = $('#descuento')
    let stock = $('#stock')
    let imagen = $('#imagen')
    let marcas = $('#marcas')
    let categorias = $('#categorias')
    let subcategorias = $('#subcategorias')
    let descripcion = $('#descripcion')
    let btn = $('#btn-submit')

    
    const funcValidate = (obj) => {
        let arr = Object.values(obj)
        console.log(arr);
        if (!arr.includes(false)) {
            btn.disabled = false
            btn.style.backgroundColor = 'var(--colorAzulFrancia)'
        }else{
            btn.disabled = true
            btn.style.backgroundColor = 'var(--colorCeleste)'
        }
    }


    
    /* Expresiones regulares para utilizar */
    let regExLetter = /^[a-zA-Z\sñáéíóúü]*$/
    let regExNumber = /^[+]?([0-9][0-9]?|150)$/
    const regExExt = /\.(jpg|jpeg|png|jfif|gif|webp)$/

        /* validar elementos */

        /* Titulo del producto */
        titulo.addEventListener('blur', function() {
            switch (true) {
                case !this.value.trim():
                    $('#tituloError').innerHTML = "Debes ingresar el titulo de tu producto"
                    this.classList.add('is-invalid')
                    validate.titulo = false
                    break;
                case !(this.value.trim().length > 2 && this.value.trim().length < 70):
                    $('#tituloError').innerHTML = "El titulo del producto debe 2 letras y maximo 70"
                    this.classList.add('is-invalid')
                    validate.titulo = false
                    break;
                default:
                    $('#tituloError').innerHTML = null
                    this.classList.remove('is-invalid')
                    this.classList.add('is-valid')
                    validate.titulo = true
                    break;
            }
            funcValidate(validate)
        })

                /* precio del producto */
    precio.addEventListener('blur', function() {
        switch (true) {
            case !this.value.trim():
                $('#precioError').innerHTML = "Debes ingresar un precio a tu producto"
                this.classList.add('is-invalid')
                validate.precio = false
                break;
            case !(this.value.trim().length >= 2 && this.value.trim().length <= 16):
                $('#precioError').innerHTML = "El precio del producto debe contener 2 caracteres y maximo 16"
                this.classList.add('is-invalid')
                validate.precio = false
                break;
            default:
                $('#precioError').innerHTML = null
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                validate.precio = true
                break;
        }
        funcValidate(validate)
    })

    descuento.addEventListener('blur', function() {
        switch (true) {
            case !(this.value.trim().length <= 2    ):
                $('#descuentoError').innerHTML = "El descuento no debe ser mayor a 2 cifras"
                this.classList.add('is-invalid')
                validate.descuento = false
                break;
            default:
                $('#descuentoError').innerHTML = null
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                validate.descuento = true
                break;
        }
        funcValidate(validate)
    })
    stock.addEventListener('blur', function() {
        switch (true) {
            case !this.value.trim():
                $('#stockError').innerHTML = "Debes ingresar el stock de tu producto"
                this.classList.add('is-invalid')
                validate.stock = false
                break;
            case !regExNumber.test(this.value.trim()):
                $('#stockError').innerHTML = "Debes ingresar un numero menor a 100"
                this.classList.add('is-invalid')
                validate.stock = false
                break;
            case !(this.value.trim().length >= 1 && this.value.trim().length <= 16):
                $('#stockError').innerHTML = "El stock del producto debe contener 1 caracteres y maximo 16"
                this.classList.add('is-invalid')
                validate.stock = false
                break;
            default:
                $('#stockError').innerHTML = null
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                validate.stock = true
                break;
        }
        funcValidate(validate)
    })
    categorias.addEventListener('blur', function() {
        switch (true) {
            case !this.value.trim():
                $('#categoriaError').innerHTML = "Debes ingresar una categoria"
                this.classList.add('is-invalid')
                validate.categorias = false
                break;
            
            default:
                $('#categoriaError').innerHTML = null
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                validate.categorias = true
                break;
        }
        funcValidate(validate)
    })
    marcas.addEventListener('blur', function() {
        switch (true) {
            case !this.value.trim():
                $('#marcaError').innerHTML = "Debes ingresar una marca"
                this.classList.add('is-invalid')
                validate.marcas = false
                break;
            default:
                $('#marcaError').innerHTML = null
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                validate.marcas = true
                break;
        }
        funcValidate(validate)
    })
    descripcion.addEventListener('blur', function() {
        switch (true) {
            case !this.value.trim():
                $('#descripcionError').innerHTML = "Debes ingresar una descripcion a tu producto"
                this.classList.add('is-invalid')
                validate.descripcion = false
                break;
            case !(this.value.trim().length >= 10 && this.value.trim().length <= 255):
                $('#descripcionError').innerHTML = "La descripcion del producto debe contener 10 caracteres y maximo 255"
                this.classList.add('is-invalid')
                validate.stock = false
                break;
            default:
                $('#descripcionError').innerHTML = null
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                validate.descripcion = true
                break;
        }
        funcValidate(validate)
    })

    imagen.addEventListener('change', function() {
        switch (true) {
            case !regExExt.exec(img.value):
                $('#imgError').innerHTML = "Solo se permite ingresar una imagen valida fomato (jpg|jpeg|png|jfif|gif|webp)"
                validate.imagen = false
                break;
            default:
                $('#imgError').innerHTML = null
                validate.imagen = true
                break;
        }
        funcValidate(validate)
    })

    const validate = {
        titulo : false,
        precio : false,
        descuento : false,
        stock : false,
        marcas : false,
        categorias : false,
        subcategorias : false,
        descripcion : false,
        imagen : true,
    }
    

    })