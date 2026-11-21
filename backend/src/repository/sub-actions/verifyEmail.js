import connection from "../connection/connection.js";

export async function verifyEmail(email) {
    const command = `
    SELECT email FROM users
    WHERE email = ?
    `

    let [resp] = await connection.query(command,[email])
    return resp;
}