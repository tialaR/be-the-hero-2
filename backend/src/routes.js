const express = require('express');

const OngController = require('./controllers/OngController'); //Método Controlador de ongs
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

const routes = express.Router();

//CRIAR SESSÃO DE LOGIN
routes.post("/sessions", SessionController.create);
//Método post é utilizado pois estou criando uma sessão

//LISTAR ONGS
routes.get("/ongs", OngController.index);
//CADASTRAR ONGS (método create):
routes.post("/ongs", OngController.create);

//LISTAR CASOS
routes.get("/incidents", IncidentController.index);
//CADASTRAR CASOS
routes.post("/incidents", IncidentController.create);
//DELETAR CASO
routes.delete("/incidents/:id", IncidentController.delete);

//LISTAR CASOS ESPECÍFICOS DE UMA ÚNICA ONG
routes.get("/profile", ProfileController.index);

module.exports = routes;
