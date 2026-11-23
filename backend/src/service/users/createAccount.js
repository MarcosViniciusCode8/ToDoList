import * as userRepository from '../../repository/actions/userRepository.js';
import { verifyEmail } from '../../repository/sub-actions/verifyEmail.js';
import { verifyName } from '../../repository/sub-actions/verifyName.js';
import { hashPassword } from '../../utils/hashPassword.js';
import { httpError } from '../../utils/httpError.js';
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,64}$/;

export default async function createAccount(user) {
    if (!user?.name || !user?.email || !user?.password) {
        throw httpError(400, "Name, email, and password are required");
    }
    if (typeof user.name !== 'string' || typeof user.password !== 'string') {
        throw httpError(400, "Name and password must be strings");
    }
    if(user.name.length < 3){
        throw httpError(400, "the username needs at least 3 characters");
    }
    if(user.name.length > 100){
        throw httpError(400, "the username accepts a maximum of 100 characters");
    }
    if(user.password.length < 8){
        throw httpError(400, "the password needs at least 8 characters");
        
    }
    if (typeof user.email !== 'string' || !emailRegex.test(user.email)) {
        throw httpError(400, "Invalid email format");
    }
    const email = user.email.toLowerCase();
    const existingUsers = await verifyEmail(email);
    if (existingUsers.length > 0) {
        throw httpError(409, "Email is already registered");
    }
    const existingName = await verifyName(user.name)
    if(existingName.length > 0){
        throw httpError(409, "Name is already registered");
        
    }


    const hash = await hashPassword(user.password)
    try {
        return await userRepository.createAccount(user, email, hash);
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            throw httpError(409, "Name or email is already registered");
        }
        throw err;
    }
}
