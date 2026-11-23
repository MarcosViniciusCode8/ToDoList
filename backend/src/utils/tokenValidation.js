import jwt from "jsonwebtoken";

export default async function TokenValidationUser(req, resp, next) {
    try {
        const [esquema, token, ...resto] = req.headers.authorization?.split(' ') ?? [];

        if (esquema?.toLowerCase() !== 'bearer' || !token || resto.length) {
            return resp.status(401).send({
                error: "Token not provided"
            })

        }

        const tipoToken = jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: ['HS256'],
        });

        if (tipoToken.user_type !== "user") {
            return resp.status(403).send({
                error: "Insufficient permission"
            })

        }

        req.user = tipoToken;
        return next();

    }
    catch (err) {
        return resp.status(401).send({ erro: 'Invalid or expired token' });
    }
}
