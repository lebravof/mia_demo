import {Router} from "express";
import {ping, readMaintenance} from "./controllerMaintenance.js";

const routerMaintenance = Router();

routerMaintenance.get('/ping', ping);

routerMaintenance.get('/maintenance', readMaintenance);

export default routerMaintenance;