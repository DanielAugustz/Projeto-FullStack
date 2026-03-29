const carRepository = require("../repositories/carRepository");

//Listar
async function listCars(req, res) {
    const cars = await carRepository.getAllCars();
    res.json(cars);
}

async function getCar(req, res ) {
    const car = await carRepository.getCarById(req.params.id);

    if (!car) {
        return res.status(404).json({erro: "Carro não encontrado"})
    }
    res.json(car);
    
}

async function createCar(req, res) {
    const { modelo, marca, ano } = req.body;
    if (modelo == null || marca == null || ano == null) {
        return res.status(400).json({ erro: "modelo, marca e ano são obrigatórios" });
    }
    const car = await carRepository.createCar({ modelo, marca, ano });
    res.status(201).json(car);
}

async function updateCar(req, res) {
    const { modelo, marca, ano } = req.body;
    if (modelo == null || marca == null || ano == null) {
        return res.status(400).json({ erro: "modelo, marca e ano são obrigatórios" });
    }
    const car = await carRepository.updateCar(req.params.id, { modelo, marca, ano });
    if (!car) {
        return res.status(404).json({ erro: "Carro não encontrado" });
    }
    res.json(car);
}

async function deleteCar(req, res) {
    const deleted = await carRepository.deleteCar(req.params.id);
    if (!deleted) {
        return res.status(404).json({ erro: "Carro não encontrado" });
    }
    res.status(204).send();
}

module.exports = { listCars, getCar, createCar, updateCar, deleteCar };