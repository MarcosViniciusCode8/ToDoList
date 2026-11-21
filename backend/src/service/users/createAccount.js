import { hash } from 'bcrypt';
import * as userRepository from '../../repository/actions/userRepository.js';
import { verifyEmail } from '../../repository/sub-actions/verifyEmail.js';
import { verifyName } from '../../repository/sub-actions/verifyName.js';
import { hashPassword } from '../../utils/hashPassword.js';
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,64}$/;

export default async function createAccount(user) {
    if (!user.name || !user.email || !user.password) {
        throw new Error("Name, email, and password are required");
    }
    if(user.name.length < 3){
        throw new Error("the username needs at least 3 characters");
    }
    if(user.name.length > 100){
        throw new Error("the username accepts a maximum of 100 characters");   
    }
    if(user.password.length <= 8){
        throw new Error("the password needs at least 8 character");
        
    }
    if (typeof user.email !== 'string' || !emailRegex.test(user.email)) {
        throw new Error("Invalid email format");
    }
    const existingUsers = await verifyEmail(user.email);
    if (existingUsers.length > 0) {
        throw new Error("Email is already registered");
    }
    const existingName = await verifyName(user.name)
    if(existingName.length > 0){
        throw new Error("Name is alredy registered");
        
    }


    const email = user.email.toLowerCase()
    const hash = await hashPassword(user.password)
    return userRepository.createAccount(user,email,hash);
}
