import express from "express";

import {isAuthenticated} from "../middlewares/isAuthenticates.js";
import { cerateCompany, getCompany, getCompanyById, updateCompany } from "../controllers/company.controller.js";

const router = express.Router();
router.route("/register").post(isAuthenticated,cerateCompany);
router.route("/getall").get(isAuthenticated,getCompany);
router.route("/get/:id").get(isAuthenticated,getCompanyById);
router.route("/update/:id").put(isAuthenticated,updateCompany);   




export default router;