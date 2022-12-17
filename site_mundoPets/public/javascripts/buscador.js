window.addEventListener('load', () => {
    let vinculacion = 'Buscador vinculado con exito'
    console.log(vinculacion);

    let $ = (elemento) => document.querySelector(elemento)

    let barraBusqueda = $('#barraBusqueda')
    let buscador = $('#search')
    let palabra = ""

    buscador.onkeydown = (evento) => {
        let letra = evento.key 
        letra === 'Backspace' ? palabra = palabra.substring(0, palabra.length - 1) : letra.length > 1 ? null :
        palabra = palabra += letra
    }
    


    barraBusqueda.addEventListener('submit', (e) => {
        e.preventDefault();


        console.log(barraBusqueda.elementos);
        /*  if () {
            barraBusqueda.submit()
        }    */
    })


    

       




})