
module.exports = {
    lista: (req, res) => {
        return res.render('admin/listaProductos')
    },
    crear: (req, res) => {
        ('admin/crearProductos')
    },
    editar: (req, res) => {
        /* id= +req.params.id
        let producto = productos.find(elemento) =>{
            return elemento .id == id
        } */
        /* return res.send(producto)  comprobar que esta llegando bien el elemento*/
        return res.render('admin/editarProductos')

    }
}