import connection from "../connection/connection.js";

export async function createAccount(user) {
    const command = `
    INSERT INTO users(name,email,password_hash,user_type)
        VALUES(?,?,?,"user")
    `

    let [resp] = await connection.query(command,[
        user.name,
        user.email,
        user.password
    ])
    return resp.insertId;
}