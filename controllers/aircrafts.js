const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

const getSingle = async (req, res) => {
  //#swagger.tags=['aircrafts']
  const aircraftId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('aircrafts').find({ _id: aircraftId });
  result.toArray().then((aircrafts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(aircrafts[0]);
  });
};

const getAll = async (req, res) => {
  //#swagger.tags=['aircrafts']
  const result = await mongodb.getDatabase().db().collection('aircrafts').find();
  result.toArray().then((aircrafts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(aircrafts);
  });
};

const createAircraft = async (req, res) => {
  //#swagger.tags=['aircrafts']
  const aircraft = {
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    yearIntroduced: req.body.yearIntroduced,
    maxSpeed: req.body.maxSpeed,
    range: req.body.range,
    engineType: req.body.engineType,
    role: req.body.role,
    crew: req.body.crew
  };
  const result = await mongodb.getDatabase().db().collection('aircrafts').insertOne(aircraft);
  if (result.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred when creating aircraft.')
  }
};

const updateAircraft = async (req, res) => {
  //#swagger.tags=['aircrafts']
  const aircraftId = new ObjectId(req.params.id);
  const aircraft = {
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    yearIntroduced: req.body.yearIntroduced,
    maxSpeed: req.body.maxSpeed,
    range: req.body.range,
    engineType: req.body.engineType,
    role: req.body.role,
    crew: req.body.crew
  };
  const result = await mongodb.getDatabase().db().collection('aircrafts').replaceOne({ _id: aircraftId }, aircraft);
  if (result.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred when updating aircraft.')
  }
};

const deleteAircraft = async (req, res) => {
  //#swagger.tags=['aircrafts']
  const aircraftId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('aircrafts').deleteOne({ _id: aircraftId });
  if (result.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred when deleting aircraft.')
  }
};


module.exports = {
  getSingle,
  getAll,
  createAircraft,
  updateAircraft,
  deleteAircraft
};