const { response } = require('express');
const Profesor = require('../models/profesores');

const getProfesores = async (req, res = response) => {
    try {
        const profesores = await Profesor.find();
        res.json(profesores);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener profesores', error });
    }
};

const getProfesor = async (req, res = response) => {
    const { id } = req.params;
    try {
        const profesor = await Profesor.findOne({ id: parseInt(id) });
        if (!profesor) return res.status(404).json({ msg: 'Profesor no encontrado' });
        res.json(profesor);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener profesor', error });
    }
};

const addProfesor = async (req, res = response) => {
    const { id, nombre, curp, edad } = req.body;
    try {
        const nuevoProfesor = new Profesor({ id, nombre, curp, edad });
        await nuevoProfesor.save();
        res.status(201).json({
            msg: `El profesor ${nombre} ha sido creado`,
            profesor: nuevoProfesor
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ msg: 'La id ya existe' });
        }
        if (error.name === 'ValidationError') {
            return res.status(400).json({ msg: 'Datos inválidos', details: error.errors });
        }
        res.status(500).json({ msg: 'Error al crear el profesor', error });
    }
};


const updateProfesor = async (req, res = response) => {
    const { id } = req.params;
    const { nombre, curp, edad } = req.body;
    try {
        const updateProfesor = await Profesor.findOneAndUpdate(
            { id: parseInt(id) },
            { nombre, curp, edad },
            { new: true, runValidators: true}
        );
        if (!updateProfesor) {
            return res.status(404).json({ msg: 'Profesor no encontrado' });
        }
        res.json({
            msg: `El profesor con id ${id} ha sido actualizado`,
            profesor: updateProfesor
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ msg: 'Datos inválidos', details: error.errors });
        }
        res.status(500).json({ msg: 'Error al actualizar el profesor', error });
    }
};

const updateEdadProfesor = async (req, res = response) => {
    const { id } = req.params;
    const { edad } = req.body;
    try {
        const updateProfesor = await Profesor.findOneAndUpdate(
            { id: parseInt(id) },
            { edad },
            { new: true, runValidators: true }
        );
        if (!updateProfesor) {
            return res.status(404).json({ msg: 'Profesor no encontrado' });
        }
        res.json({
            msg: `El profesor con id ${id} ha sido actualizado`,
            nombre: updateProfesor.nombre,
        });
    } catch (error) {
        res.status(500).json({ msg: 'Error al actualizar el profesor', error });
    }
};

const deleteProfesor = async (req, res = response) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ msg: 'ID no válido' });
    }
    try {
        const deleteProfesor = await Profesor.findOneAndDelete({ id: parseInt(id) });
        if (!deleteProfesor) {
            return res.status(404).json({ msg: 'Profesor no encontrado' });
        }
        res.status(200).json({
            msg: `El profesor con id ${id} ha sido eliminado`,
            profesor: deleteProfesor
        });
    } catch (error) {
        res.status(500).json({ msg: 'Error al eliminar el profesor', error });
    }
};

module.exports = {getProfesores,addProfesor,updateProfesor,
    updateEdadProfesor, deleteProfesor, getProfesor};