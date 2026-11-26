import connection from "../connection/connection.js";

export async function verifyEmailForLogin(email) {
    const command = `
    SELECT id, password_hash, user_type FROM users
    WHERE email = ?
    `

    let [resp] = await connection.query(command,[email])
    return resp[0];
}
