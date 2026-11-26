import { verifyEmailForLogin } from '../../repository/sub-actions/verifyEmailForLogin.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { httpError } from '../../utils/httpError.js';
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,64}$/;


export default async function login(user) {
    if (!user?.email || typeof user?.password !== 'string' || !user.password) {
        throw httpError(400, "Invalid credentials");
    }

    if (typeof user.email !== 'string' || !emailRegex.test(user.email)) {
        throw httpError(400, "Invalid email format");
    }

    const account = await verifyEmailForLogin(user.email.toLowerCase());
    if (!account || !(await bcrypt.compare(user.password, account.password_hash))) {
        throw httpError(401, "Invalid email or password.");
    }

    return jwt.sign(
        { id: Number(account.id), user_type: String(account.user_type) },
        process.env.JWT_SECRET,
        { expiresIn: '1h', algorithm: 'HS256' }
    );
}
