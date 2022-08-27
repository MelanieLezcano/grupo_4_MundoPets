let ProduEdit = productos.map((element,index) => {
    if (element.id === 6) {
        element.marca = ""
        element.titulo = ""
        element.precio = 0
        element.stock = 0
    }
    return element
})