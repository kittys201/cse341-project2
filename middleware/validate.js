const validator = require('../helpers/validate');

const saveBird = (req, res, next) => {
  const validationRule = {
    name: 'required|min:1|max:30|string',
    species: 'required|min:1|max:30|string',
    gender: 'required|min:1|max:10|string',
    color: 'required|min:1|max:20|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};


const saveAircraft = (req, res, next) => {
    const validationRule = {
      name: 'required|min:1|max:50|string',
      manufacturer: 'required|min:1|max:50|string',
      yearIntroduced: ['required', 'regex:/^(19|20)[\\d]{2,2}$/'],
      maxSpeed: 'required|min:1|max:20|string',
      range: 'required|min:1|max:20|string',
      engineType: 'required|min:1|max:20|string',
      role: 'required|min:1|max:50|string',
      crew: 'required|min:1|max:5|string',
      };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };
  
  const checkMongoId = (req, res, next) => {
    const validationRule = {
      id: 'required|min:24|max:24|string'
    };
    validator(req.params, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  }
module.exports = {
  saveBird,
  saveAircraft,
  checkMongoId
};