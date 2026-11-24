import { Router } from "express";
const endpoint = Router();


import createAccount from "../service/users/createAccount.js";
import login from "../service/users/login.js";
import TokenValidationUser from "../utils/tokenValidation.js";
import loginLimiter from "../utils/rateLimiter.js";

function sendUserError(resp, err, fallbackMessage) {
    if (err.status === 400 || err.status === 401 || err.status === 409) {
        return resp.status(err.status).send({ erro: err.message });
    }

    return resp.status(500).send({ erro: fallbackMessage });
}

endpoint.post('/user/register', async (req, resp) => {
    try {
        let user = req.body;

        await createAccount(user);

        resp.status(201).send({
            response: "Your account was created successfully."
        })
    }
    catch (err) {
        return sendUserError(resp, err, 'An internal error occurred while creating your account.');
    }
})

endpoint.post('/user/login', loginLimiter , async (req, resp) => {
    try {
        let user = req.body;

        let response = await login(user);

        resp.status(200).send({
            response: response
        })
    }
    catch (err) {
        return sendUserError(resp, err, 'An internal error occurred while signing in.');
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
    }
})
export default endpoint;
