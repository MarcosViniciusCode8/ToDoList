import { Router } from "express";
const endpoint = Router();


import createAccount from "../service/users/createAccount.js";
import login from "../service/users/login.js";
import viewProfile from "../service/users/viewProfile.js";
import  editUsername  from "../service/users/editUsername.js";
import  editEmail  from "../service/users/editEmail.js";
import TokenValidationUser from "../utils/tokenValidation.js";
import loginLimiter from "../utils/rateLimiter.js";
import sendUserError from "../utils/sendUserError.js";


endpoint.post('/api/auth/cadastro', async (req, resp) => {
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

endpoint.post('/api/auth/login', loginLimiter, async (req, resp) => {
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

endpoint.post('/api/users/me', TokenValidationUser, async (req, resp) => {
    try {
        const password = req.body?.password;
        const id = req.user.id;

        const response = await viewProfile(id, password);
        return resp.send(response);
    }
    catch (err) {
        return sendUserError(resp, err, 'An internal error occurred while processing your query.');
    }
})

endpoint.put('/api/usuarios/me/name', TokenValidationUser, async (req, resp) => {
    try {
        const username = req.body?.name;
        const id = req.user.id;

        let response = await editUsername(username,id);
        if(response == 1){
            resp.send({
                response: "Name changed"
            })
        }
    }
    catch (err) {
        return sendUserError(resp, err, 'An internal error occurred while processing your query.');
    }
})

endpoint.put('/api/usuarios/me/email', TokenValidationUser, async (req, resp) => {
    try {
        const email = req.body?.email;
        const id = req.user.id;

        let response = await editEmail(email,id);
        if(response == 1){
            resp.send({
                response: "Email changed"
            })
        }
    }
    catch (err) {
        return sendUserError(resp, err, 'An internal error occurred while processing your query.');
    }
})

export default endpoint;
