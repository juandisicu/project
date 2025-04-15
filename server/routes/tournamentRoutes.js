const express = require('express');
const Tournament = require('../models/Tournament');
const router = express.Router();

// Crear torneo
router.post('/', async (req, res) => {
    console.log('📦 Body recibido:', req.body);
  
    const { name, number, location } = req.body;
  
    try {
      const newTournament = new Tournament({ name, number, location });
      await newTournament.save(); // <- Aquí puede estar fallando
      console.log('✅ Torneo guardado en MongoDB:', newTournament);
      res.status(201).json({ message: 'Torneo creado', data: newTournament });
    } catch (error) {
      console.error('❌ Error al guardar torneo:', error); // 👈 imprime todo el error
      res.status(400).json({ message: 'Error al crear torneo', error });
    }
  });

// Obtener torneos
router.get('/search', async (req, res) => {
    const { q } = req.query;
  
    try {
      const results = await Tournament.find({
        name: { $regex: q, $options: 'i' } // búsqueda insensible a mayúsculas
      });
      res.json(results);
    } catch (error) {
      console.error('❌ Error en búsqueda:', error);
      res.status(500).json({ message: 'Error al buscar torneos' });
    }
  });

  //obtener todos los torneos
  router.get('/', async (req, res) => {
    try {
      const all = await Tournament.find().sort({ name: 1 }); // orden ascendente
      res.json(all);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener torneos' });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const torneo = await Tournament.findById(req.params.id);
      res.json(torneo);
    } catch (err) {
      res.status(500).json({ message: 'Error al obtener el torneo' });
    }
  });

  //editar
  router.put('/:id', async (req, res) => {
    try {
      const updated = await Tournament.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updated);
    } catch (err) {
      res.status(500).json({ message: 'Error al actualizar' });
    }
  });

  //delete
  router.delete('/:id', async (req, res) => {
    try {
      await Tournament.findByIdAndDelete(req.params.id);
      res.json({ message: 'Torneo eliminado' });
    } catch (err) {
      res.status(500).json({ message: 'Error al eliminar' });
    }
  });
  
    

module.exports = router;


