const express = require('express');
const router = express.Router();

const Viaje = require('../models/Viajes');
const Testimonial = require('../models/Testimoniales');

/** Controladores */
const nosotrosController = require('../controllers/nosotrosContrllers');
const homeController = require('../controllers/homeController');
const viajesController = require('../controllers/viajesController');
const testimonialesController = require('../controllers/testimonialesController')


module.exports = function(){
    //para multiples consulta   
    router.get('/', homeController.consultasHomePage);
    router.get('/nosotros', nosotrosController.InfoNosotros);
    router.get('/viajes', viajesController.mostrarViajes);
    router.get('/viajes/:id', viajesController.mostrarViaje);
    router.get('/testimoniales', testimonialesController.mostrarTestimoniales);

    //Caundo se llena el formulario
    router.post('/testimoniales', testimonialesController.mostrarTestimonial )

    return router;
}