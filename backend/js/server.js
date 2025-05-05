//MongoDB
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer'); 
const app = express();
const port = 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

mongoose.connect('SUA_STRING_AQUI', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB conectado'))
.catch(err => console.error('Erro ao conectar', err));

const ImagemSchema = new mongoose.Schema({
    nome: String,
    imagem: Buffer,
    mimetype: String
});
const Imagem = mongoose.model('Imagem', ImagemSchema);

app.post('/upload', upload.single('imagem'), async (req, res) => {
    const novaImagem = new Imagem({
        nome: req.file.originalname,
        imagem: req.file.buffer,
        mimetype: req.file.mimetype
    });
    await novaImagem.save();
    res.send('Imagem salva com sucesso!');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
