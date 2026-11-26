import connection from "../connection/connection.js";

export async function createAccount(user,email,hash) {
    const command = `
    INSERT INTO users(name,email,password_hash,user_type)
        VALUES(?,?,?,'user')
    `

    let [rows] = await connection.query(command,[
        user.name,
        email,
        hash
    ])
    return rows.insertId;
}

export async function viewProfile(id){
    const command = `
    SELECT name, email, user_type FROM users
    WHERE id = ?
    `

    const [rows] = await connection.query(command, [id]);
    return rows[0];
}

export async function editUsername(name, id) {
    const command = `
    UPDATE users
    SET name = ?
    WHERE id = ?;
    `

    const [rows] = await connection.query(command,[name,id]);
    return rows.affectedRows
}

export async function editEmail(email, id) {
    const command = `
    UPDATE users
    SET email = ?
    WHERE id = ?;
    `

    const [rows] = await connection.query(command,[email,id]);
    return rows.affectedRows
}

