import pool from './dbConnection.js';

async function getAllUsers() {
    const queryText = "SELECT * FROM users";
    const result = await pool.query(queryText);
    return result.rows;
}

async function getOneUserById(id) {
    const queryText = "SELECT * FROM users where id= $1";
    const values = [id];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

async function getOneUserByEmail(email) {
    const queryText = "SELECT * FROM users where email= $1";
    const values = [email];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}



async function deleteUser(id) {
    let queryText = "DELETE FROM users WHERE id =$1; ";
    const values = [id];
    const result = await pool.query(queryText, values);
    return result.rowCount;
}

async function addUser(name, email, password) {
    let queryText = "INSERT INTO users ( name, email, password) VALUES ($1, $2, $3) RETURNING *";
    let values = [name, email, password];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

async function getUserById(googleId) {
    const queryText = "SELECT * FROM users where googleid= $1";
    const values = [googleId];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

async function createNewUser([firstName, lastName, email, hashedPassword]) {
    let queryText = "INSERT INTO users ( firstName, lastName, email, hashedPassword) VALUES ($1, $2, $3, $4) RETURNING *";
    let values = [firstName, lastName, email, hashedPassword];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}


export default {
    getAllUsers,
    getOneUserById,
    getOneUserByEmail,
    deleteUser,
    addUser,
    getUserById,
    createNewUser
};