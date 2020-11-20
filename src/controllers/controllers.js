const db = require('../models/book.models');
const Book = db.books;

exports.create = (req, res) => {
    if(!req.body.title) {
        res.status(404).send({message:"Contenido no puede estar vacío."});
        return;
    }
    //crear book
    const book = new Book({
        titulo: req.body.titulo,
        autor: req.body.autor,
        imagen: req.body.imagen,
        estado: req.body.estado
    });

    //guardar libro
    book.save(book).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Surgio un problema al crear el libro."
        });
    });
};

exports.findAll = (req, res) => {
    const id = req.body.id;
    var condition = id ? { id: {$regex: new RegExp(id),$options: "i"}} : {};

    Book.find(condition)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Ocurrió un error al obtener los libros."
        });
    });
};

//update 
exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Campos no pueden estar vaciós."
        });
    }

    const id = req.params.id;

    Book.finByIdAndUpdate(id, req.body, { useFindAndModify: false})
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "No se ha podido modificar el libro con ese id."
            });
        }else  { 
            res.send({ message:"Se ha actualizado el libro."});
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error al intentar actualizarlo"
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Book.findByIdAndRemove(id, {useFindAndModify: false})
    .then(data => {
        if(!data) {
            res.status(400).send({
                message: "No se pudo eliminar el libro con ese id."
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Se ha eliminado el libro."
        });
    });

};




