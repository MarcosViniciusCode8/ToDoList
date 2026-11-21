import connection from "../connection/connection.js";

export async function verifyName(name) {
    const command = `
    SELECT name FROM users
    WHERE name = ?
    `

    let [resp] = await connection.query(command,[name])
    return resp;
}