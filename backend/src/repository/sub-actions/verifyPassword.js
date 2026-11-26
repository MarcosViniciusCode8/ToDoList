import connection from "../connection/connection.js";

export async function verifyPassword(id) {
    const command = `
    SELECT password_hash FROM users
    WHERE id = ?
    `

    let [resp] = await connection.query(command,[id])
    return resp[0];
}