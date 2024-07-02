const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

const getSingle = async (req, res) => {
  //#swagger.tags=['birds']
  const birdId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('birds').find({ _id: birdId });
  result.toArray().then((birds) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(birds[0]);
  });
};

const getAll = async (req, res) => {
  //#swagger.tags=['birds']
  const result = await mongodb.getDatabase().db().collection('birds').find();
  result.toArray().then((birds) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(birds);
  });
};

const createBird = async (req, res) => {
  //#swagger.tags=['birds']
  const bird = {
    name: req.body.name,
    species: req.body.species,
    gender: req.body.gender,
    color: req.body.color
  };
  const result = await mongodb.getDatabase().db().collection('birds').insertOne(bird);
  if (result.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred when creating bird.')
  }
};

const updateBird = async (req, res) => {
  //#swagger.tags=['birds']
  const birdId = new ObjectId(req.params.id);
  const bird = {
    name: req.body.name,
    species: req.body.species,
    gender: req.body.gender,
    color: req.body.color
  };
  const result = await mongodb.getDatabase().db().collection('birds').replaceOne({ _id: birdId }, bird);
  if (result.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred when updating bird.')
  }
};

const deleteBird = async (req, res) => {
  //#swagger.tags=['birds']
  const birdId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('birds').deleteOne({ _id: birdId });
  if (result.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred when deleting bird.')
  }
};


module.exports = {
  getSingle,
  getAll,
  createBird,
  updateBird,
  deleteBird
};