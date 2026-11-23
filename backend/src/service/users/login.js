import * as userRepository from '../../repository/sub-actions/verifyEmailForLogin.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { searchInfos } from '../../repository/sub-actions/searchInfos.js';
import { httpError } from '../../utils/httpError.js';
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,64}$/;


export default async function login(user) {
    if (!user?.email || !user?.password) {
        throw httpError(400, "Invalid credentials");
    }

    if (typeof user.email !== 'string' || !emailRegex.test(user.email)) {
        throw httpError(400, "Invalid email format");
    }

    let searchUser = await userRepository.verifyEmailForLogin(user.email);
    let infos = await searchInfos(user.email)
    if (searchUser) {
        const hash_compare = await bcrypt.compare(user.password, searchUser.password_hash);
        if (hash_compare) {
            let token = jwt.sign(
                { id: Number(infos.id), user_type: String(infos.user_type) },
                process.env.JWT_SECRET,
                { expiresIn: '1h', algorithm: 'HS256' }
            )
            return token;
        }
        else {
            throw httpError(401, "Invalid email or password.");

        }
    }
    else {
        throw httpError(401, "Invalid email or password.");

    }



}
