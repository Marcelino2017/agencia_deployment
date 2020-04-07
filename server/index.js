//emportar express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const routes = require('./routes');
const configs = require('./config');
const db = require('./config/database')

require('dotenv').config({path: 'variables.env' })

db.authenticate()
    .then(() => console.log('DB Canectada'))
    .catch(error => console.log(error));
    

//configurar express
const app = express();

//habilitar pug
app.set('view engine', 'pug');

//añadir las vista
app.set('views', path.join(__dirname, './views'));

//Caragr una carperta estatia
app.use(express.static('public'));

//validar si estamos en desarrolo o en produccion
const config = configs[app.get('env')];

//creamos la variable para el citio web
app.locals.titulo = config.nombresitio;

//muestra el año actuañ
app.use((req, res, next) => {
    //crear un nueva fecha
    const fecha = new Date();    
    //creamos variables para leerla encualquier lugar
    res.locals.fechaActual = fecha.getFullYear();
    res.locals.ruta = req.path;    
    // console.log(res.locals);
    
    return next();
})

//ejecutar el bodyParser
app.use(bodyParser.urlencoded({extended: true}))

//cargar las rutas
app.use('/', routes());

/** Puerto y host para la app */
const host = process.env.HOSt || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
    console.log('El servidor esta funcionando ');
    
});