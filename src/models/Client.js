const Sequelize = require('sequelize');
const  {sequelize}  = require('../database/db');
const bcrypt = require('bcryptjs');

const Client = sequelize.define('client', {

  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: /^[a-zA-Z\sñÑ]+$/i, //validamos q tipo de caracteres puede tener
      notEmpty: true, // que no este vacio
      len: [2, 70] // definir un minimo y un maximo
    }
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: /^[a-zA-Z\sñÑ]+$/i, //validamos q tipo de caracteres puede tener
      notEmpty: true, // que no este vacio
      len: [2, 70] // definir un minimo y un maximo
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate:{
      isEmail: true,
      notEmpty: true,
      len: [3, 50]
    }
  },
  rut: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate:{
      //is: /^[a-zA-Z\sñÑ]+$/i, //validamos q tipo de caracteres puede tener
      notEmpty: true,
      len: [3, 50]
    }
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate:{
      is: /^[a-zA-Z\sñÑ]+$/i, //validamos q tipo de caracteres puede tener
      notEmpty: true,
      len: [3, 50]
    }
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
    validate:{
      //is: /^[a-zA-Z\sñÑ]+$/i, //validamos q tipo de caracteres puede tener
      notEmpty: true,
      len: [3, 50]
    }
  }
}, {
  timestamps: false,
  hooks: {
    beforeValidate: (client) => {
        if (typeof client.name === 'string') client.name = client.name.trim();
        if (typeof client.lastname === 'string') client.lastname = client.lastname.trim();
        if (typeof client.email === 'string') client.email = client.email.trim().toLowerCase();
    }
  }
});

module.exports = Client
