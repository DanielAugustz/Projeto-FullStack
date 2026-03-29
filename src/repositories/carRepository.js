const db = require('../config/mysql')
const Car = require('../models/carModel')

//Listar
async function getAllCars() {
    const [rows] = await db.query('SELECT * FROM carros');

    return rows.map(
        row => new Car(row.id, row.modelo, row.marca, row.ano)
    );
};

//Buscar por id
async function getCarById(id) {
    const [rows] = await db.query('SELECT * FROM carros WHERE id = ?', [id])
    
    if (!rows[0])
        return null

    const row = rows[0]

    return new Car(row.id, row.modelo, row.marca, row.ano)

};

async function createCar({ modelo, marca, ano }) {
    const [result] = await db.query(
        'INSERT INTO carros (modelo, marca, ano) VALUES (?, ?, ?)',
        [modelo, marca, ano]
    );
    return getCarById(result.insertId);
}

async function updateCar(id, { modelo, marca, ano }) {
    const [result] = await db.query(
        'UPDATE carros SET modelo = ?, marca = ?, ano = ? WHERE id = ?',
        [modelo, marca, ano, id]
    );
    if (result.affectedRows === 0) return null;
    return getCarById(id);
}

async function deleteCar(id) {
    const [result] = await db.query('DELETE FROM carros WHERE id = ?', [id]);
    return result.affectedRows > 0;
}

module.exports = { getAllCars, getCarById, createCar, updateCar, deleteCar };