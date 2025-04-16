const express = require('express');
const Tournament = require('../models/Tournament');
const router = express.Router();

// Crear torneo
router.post('/', async (req, res) => {
    console.log('📦 Body received:', req.body);
  
    const { name, number, location } = req.body;
  
    try {
      const newTournament = new Tournament({ name, number, location });
      await newTournament.save(); // <- Aquí puede estar fallando
      console.log('✅ Tournament saved in MongoDB:', newTournament);
      res.status(201).json({ message: 'Torneo creado', data: newTournament });
    } catch (error) {
      console.error('❌ Error saving the tournament:', error);
      res.status(400).json({ message: 'Error while creating the tournament', error });
    }
  });

// Obtener torneos
router.get('/search', async (req, res) => {
    const { q } = req.query;
  
    try {
      const results = await Tournament.find({
        name: { $regex: q, $options: 'i' } 
      });
      res.json(results);
    } catch (error) {
      console.error('❌ Error while searching :', error);
      res.status(500).json({ message: 'Error while searching the tournament' });
    }
  });


  router.get('/', async (req, res) => {
    try {
      const all = await Tournament.find().sort({ name: 1 });
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


