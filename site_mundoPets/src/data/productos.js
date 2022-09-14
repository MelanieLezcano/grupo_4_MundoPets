const fs = require ('fs')
let productos =require('./productos.json')

let ultimoId = productos[productos.length - 1].id + 1 ; 

console.log(ultimoId);

/* crear un producto nuevo */
let nuevoProducto={
    id: 21,
    categoria: "gato",
    marca: "VitalCan",
    titulo: "VitalCan Complete Balance 10kg",
    precio: 9000,
    descuento: 30,
    descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum numquam, placeat eius perferendis aspernatur doloribus aliquid, quibusdam aperiam hic a tenetur! Quis rem aut qui expedita ut aspernatur nisi officiis.",
    stock: 8,
    imagenes: [
        "gk-complete-gato-kitten-75kg-removebg-preview.png",
        "",
        "",
        ""
    ]
}

/* productos.push(nuevoProducto); */
/* let string = JSON.stringify(productos,null,4)
fs.writeFileSync('./site_mundoPets/data/productos.json',string,'utf-8') */





 /* editar producto */
let produEdit = productos.map((elemento,index) => {
   if (elemento.id === 5) {
     elemento.categoria = "perro"
     elemento.titulo = " Balanced Complete"
     elemento.precio = 18000
     elemento.descuento= 10
     elemento.descripcion = " Alimento para gatos Balanced Complete"
     elemento.stock = 8
   }
   return elemento
})
 
/* let string = JSON.stringify(produEdit,null,4)
fs.writeFileSync('./site_mundoPets/data/productos.json',string,'utf-8') */

/* eliminar producto */

let eliminarProducto = productos.filter (elemento => elemento.id !== 21) 


/* Pasamos el Objeto literal a un string */
/* let string = JSON.stringify(eliminarProducto,null,4) */

/* Subimos los cambios y actualizaciones al json */
/* fs.writeFileSync('./src/data/productos.json',string,'utf-8') */
