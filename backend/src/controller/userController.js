import { Router } from "express";
const endpoint = Router();
import errorMessageInConsole from "../utils/errorMessageInConsole.js";

import createAccount from "../service/users/createAccount.js";

endpoint.post('/user/register', async (req,resp) => {
    try{
        let user = req.body;
        
        await createAccount(user);

        resp.status(201).send({
            response: "Sua conta foi criada com sucesso"
        })
    }
    catch(err){
        let erro = err.message
        resp.status(400).send({
            erro: erro
        })
        errorMessageInConsole(erro)
    }
})

export default endpoint;
