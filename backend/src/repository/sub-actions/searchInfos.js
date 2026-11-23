import connection from "../connection/connection.js";

export async function searchInfos(email) {
    const command = `
    SELECT id, user_type FROM users
    WHERE email = ?
    `

    let [resp] = await connection.query(command,[email])
    console.log(resp[0]);
    return resp[0];
}