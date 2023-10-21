const express = require('express');
const ClientModel = require('../model');

const multer = require('../../middleware/multerConfig'); 

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const nameQuery = req.query.name; 
    
    let query = {}; 
    
    if (nameQuery) {
      query.name = nameQuery;
    }

    const clientResult = await ClientModel.find(query);

    res.status(200).json(clientResult);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const client = await ClientModel.findOne({_id: id});  
      if (!client) {
        return res.status(422).json({ message: 'O cliente não foi encontrado' });
      }
      res.status(200).json(client)
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }
);

router.post('/', multer.single('upload'), async (req, res) => {
    const { name, cnpj_cpf } = req.body;
    const { file } = req.file;
    const client = {
      name,
      cnpj_cpf,
      uploads: file, 
    };
    
    if (!name) {
      return res.status(422).json({ error: 'O nome é obrigatório'});
    }
    try {
      await ClientModel.create(client);
      res.status(201).json("Cliente inserido no sistema com sucesso!");
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: err.message });
    }
  }
);

router.put('/:id', async (req, res) => {
    const { name } = req.body;
    try {
      const updatedClient = await ClientModel.findByIdAndUpdate(req.params.id, req.body);  
      if (!updatedClient || !name) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
      }  
      res.json({ message: 'Dados alterado com sucesso!' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);
  
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedClient = await ClientModel.deleteOne({_id: id});
        if (!deletedClient) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }
        res.json({ message: 'Cliente excluído com sucesso' });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
});  

module.exports = router;
