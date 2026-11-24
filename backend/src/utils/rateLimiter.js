import {rateLimit, MINUTE} from 'express-rate-limit';

const loginLimiter = rateLimit({
    windowMs: 15 * MINUTE,
    limit: 5,
    skipSuccessfulRequests: true,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    identifier: 'login',
    message: { erro: 'Too many login attempts. Try again later.' },
});

export default loginLimiter;