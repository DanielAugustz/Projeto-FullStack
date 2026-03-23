const carRepository = require("../repositories/carRepository");

//Listar
async function listCars(req, res) {
    const cars = await carRepository.getAllCars();
    res.json(cars);
}

async function getCar(req, res ) {
    const car = await carRepository.getCarsById(req.params.id);

    if (!car) {
        return res.status(404).json({erro: "Carro não encontrado"})
    }
    res.json(car);
    
}

module.exports = { listCars,  getCar}