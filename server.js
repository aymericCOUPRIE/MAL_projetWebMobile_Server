//déclaration de l'application
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
const session = require('express-session')
const cookieParser = require('cookie-parser')

//déclaration du port
var port = process.env.PORT || 3000;

//pour proteger les injection
var sanitizer = require("express-sanitizer");

//déclaration de ce que l'app utilise comme module
app.use(sanitizer());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser())

app.use(cors())

//pour utiliser des variables d'environnement
const dotenv = require("dotenv");
dotenv.config();

//déclaration des routes
const Users = require("./routes/Users");
app.use("/server", Users);

const Societes = require('./routes/Societes');
app.use('/server/societe', Societes);

const Festivals = require('./routes/Festivals');
app.use("/server/festivals",Festivals);

const Jeux = require('./routes/Jeux');
app.use("/server/jeux",Jeux);

const Reservations = require('./routes/Reservations')
app.use("/server/reservations", Reservations)

const TypeJeu = require('./routes/TypeJeu')
app.use('/server/typeJeu',TypeJeu)

//lancement serveur
app.listen(port, function () {
    console.log("Server is running on port " + port);
});
