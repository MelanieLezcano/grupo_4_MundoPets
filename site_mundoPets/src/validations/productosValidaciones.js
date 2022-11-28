const {check} = require('express-validator');

module.exports = [
    /* TITULO */
    check('Titulo').trim()
    .notEmpty().withMessage('Este campo es obligatorio').bail()
    .isLength({min: 2, max: 70 }).withMessage('Debe contener al menos 2 caracteres'),

    /* MARCA */
    check('Marca').trim()
    .notEmpty().withMessage('Este campo es obligatorio'),

    /* PRECIO */
    check('Precio').trim()
    .notEmpty().withMessage('Este campo es obligatorio').bail()
    .isInt().withMessage('Solo se aceptan números').bail()
    .isLength({min: 2, max: 16 }).withMessage('Debe contener al menos 2 caracteres'),

    /* DESCUENTO */
    check('Descuento').trim()
    .isInt().withMessage('Sólo se aceptan números').bail()
    .isLength({min: 2, max: 2 }).withMessage('Debe contener al menos 2 caracteres'),

    /* STOCK */
    check('Stock').trim()
    .notEmpty().withMessage('Este campo es obligatorio').bail()
    .isInt().withMessage('Sólo se aceptan números').bail()
    .isLength({min: 1, max: 3 }).withMessage('Debe contener al menos 3 caracteres'),
   
    /* CATEGORIA */
    check('Categoria').trim()
    .notEmpty().withMessage('Debe seleccionar una categoría'),

    /* SUBCATEGORIA */
    check('Subcategoria').trim()
    .notEmpty().withMessage('Debe seleccionar una subcategoría'),

    /* DESCRIPCION */
    check('Descripcion').trim()
    .notEmpty().withMessage('Este campo es obligatorio').bail()
    .isLength({min:10, max: 255 }).withMessage('Debe contener al menos 10 caracteres')
]

