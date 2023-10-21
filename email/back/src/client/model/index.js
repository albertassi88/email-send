const mongoose = require('mongoose')

const Client = mongoose.model('Client', {
  name: {
    type: String,
    required: true,
  },
  cnpj_cpf: {
    type: String,
    required: true,
    unique: true, 
  },
  upload: [
    {
      filename: {
        type: String,
        required: true,
      },
      path: {
        type: String,
        required: true,
      },
    }
  ],
})

module.exports = Client;

