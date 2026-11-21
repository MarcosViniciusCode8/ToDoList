import * as userRepository from '../../repository/actions/userRepository.js';
import { verifyEmail } from '../../repository/sub-actions/verifyEmail.js';
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,64}$/;
export default function createAccount(user) {
    if (!user.name || !user.email || !user.password) {
        throw new Error("Name, email, and password are required");
    }
    if (emailRegex.test(user.email)) {
        throw new Error("Invalid email format");
    }
    if (verifyEmail(user.email)) {
        throw new Error("Email is already registered");
    }
        userRepository.createAccount(user)
}