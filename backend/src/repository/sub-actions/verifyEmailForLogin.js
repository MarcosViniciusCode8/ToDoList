import connection from "../connection/connection.js";

export async function verifyEmailForLogin(email) {
    const command = `
    SELECT id,email,password_hash FROM users
    WHERE email = ?
    `

    let [resp] = await connection.query(command,[email])
    return resp[0];
}