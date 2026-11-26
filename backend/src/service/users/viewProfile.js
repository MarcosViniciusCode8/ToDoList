import { verifyPassword } from '../../repository/sub-actions/verifyPassword.js';
import * as userRepository from '../../repository/actions/userRepository.js';
import bcrypt from 'bcrypt';
import { httpError } from '../../utils/httpError.js';

export default async function viewProfile(id, password) {
    if (!password) {
        throw httpError(401, "Password is required.");
    }

    if (typeof password !== 'string' || password.length < 8) {
        throw httpError(400, "Password must be a string with at least 8 characters.");
    }

    const account = await verifyPassword(id);
    if (!account || !(await bcrypt.compare(password, account.password_hash))) {
        throw httpError(401, "Invalid password.");
    }

    const profile = await userRepository.viewProfile(id);
    return profile;
}
