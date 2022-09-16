const {check} = require('express-validator');

module.exports = [
    /* TITULO */
    check('Titulo').trim()
    .notEmpty().withMessage('Este campo es obligatorio').bail()
    .isLength({min:5}).withMessage('Debe contener al menos 5 caracteres'),

    /* MARCA */
    check('Marca').trim()
    .notEmpty().withMessage('Este campo es obligatorio'),

    /* PRECIO */
    check('Precio').trim()
    .notEmpty().withMessage('Este campo es obligatorio').bail()
    .isInt().withMessage('Solo se aceptan números'),

    /* DESCUENTO */
    check('Descuento').trim()
    .isInt().withMessage('Sólo se aceptan números'),

    /* STOCK */
    check('Stock').trim()
    .notEmpty().withMessage('Este campo es obligatorio').bail()
    .isInt().withMessage('Sólo se aceptan números'),
   
    /* CATEGORIA */
    check('Categoria').trim()
    .notEmpty().withMessage('Debe seleccionar una categoría'),

    /* SUBCATEGORIA */
    check('Subcategoria').trim()
    .notEmpty().withMessage('Debe seleccionar una subcategoría'),

    /* DESCRIPCION */
    check('Descripcion').trim()
    .notEmpty().withMessage('Este campo es obligatorio').bail()
    .isLength({min:10}).withMessage('Debe contener al menos 10 caracteres')
]

