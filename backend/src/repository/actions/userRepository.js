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

export async function viewProfile(id){
    const command = `
    SELECT name, email, user_type FROM users
    WHERE id = ?
    `

    const [rows] = await connection.query(command, [id]);
    return rows[0];
}

