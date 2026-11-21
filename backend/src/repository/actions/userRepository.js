import connection from "../connection/connection.js";

export async function createAccount(user,email,hash) {
    const command = `
    INSERT INTO users(name,email,password_hash,user_type)
        VALUES(?,?,?,'user')
    `

    let [resp] = await connection.query(command,[
        user.name,
        email,
        hash
    ])
    return resp.insertId;
}
