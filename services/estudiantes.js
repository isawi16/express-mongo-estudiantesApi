const Estudiante = require('../models/estudiantes');

const listar = async({ skip = 0, limit = 50 })=>{
    const [items, total] = await Promise.all([
    Estudiante.find().skip(skip).limit(limit), Estudiante.countDocuments() ]);
  return { items, total };
}


const obtenerPorMatricula = async(matricula) =>{
  return await Estudiante.findOne({ matricula }).lean();
}

const crear = async(data) =>{
  const est = new Estudiante(data);
  return await est.save();
}

const actualizarPorMatricula = async(matricula, data) =>{
  return await Estudiante.findOneAndUpdate({ matricula }, { $set: data }, { new: true, runValidators: true });
}

const actualizarEdadPorMatricula = async(matricula, edad) =>{
  return await Estudiante.findOneAndUpdate({ matricula }, { $set: {edad} }, { new: true, runValidators: true });
}

const eliminarPorMatricula = async (matricula) =>{
  return await Estudiante.findOneAndDelete({ matricula });
}

module.exports = { listar, obtenerPorMatricula, crear, actualizarPorMatricula, eliminarPorMatricula, actualizarEdadPorMatricula };
