const express = require('express');
const router = express.Router();
const{
    getProfesores,addProfesor,updateProfesor,
    updateEdadProfesor, deleteProfesor, getProfesor
} = require('../controllers/profesores');

router.get('/', getProfesores);
router.get('/:id', getProfesor);
router.post('/', addProfesor);
router.put('/:id', updateProfesor);
router.patch('/:id', updateEdadProfesor);
router.delete('/:id', deleteProfesor);

module.exports = router;
