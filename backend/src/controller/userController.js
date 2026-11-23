import { Router } from "express";
const endpoint = Router();
import errorMessageInConsole from "../utils/errorMessageInConsole.js";

import createAccount from "../service/users/createAccount.js";
import login from "../service/users/login.js";
import TokenValidationUser from "../utils/tokenValidation.js";

endpoint.post('/user/register', async (req, resp) => {
    try {
        let user = req.body;

        await createAccount(user);

        resp.status(201).send({
            response: "Sua conta foi criada com sucesso"
        })
    }
    catch (err) {
        let erro = err.message
        resp.status(400).send({
            erro: erro
        })
        errorMessageInConsole(erro)
    }
})

endpoint.post('/user/login', async (req, resp) => {
    try {
        let user = req.body;

        let response = await login(user);

        resp.status(200).send({
            response: response
        })
    }
    catch (err) {
        let erro = err.message
        resp.status(401).send({
            erro: erro
        })
        errorMessageInConsole(erro)
    }
})


endpoint.get('/health', TokenValidationUser, async (req, resp) => {
    try {
        resp.send({
            resp: "ok"
        })
    }
    catch (err) {
        let erro = err.message
        resp.status(401).send({
            erro: erro
        })
        errorMessageInConsole(erro)
    }
})
export default endpoint;
