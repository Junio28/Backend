const User = require('../models/User');
const bcrypt = require('bcryptjs');
async function getUsers(req, res) {
    try {
        const users = await User.findAll({
        });
        res.json({
            data: users
        })
    } catch (error) {
        console.log(error);
        res.json({
            data: {},
            message: 'Ah ocurrido un error interno'
        });
    }
};

//Crear usuario
async function addUsers(req, res) {
    try {
        const user = await User.create(req.body); //dinamico

        res.status(201).send(user);
    } catch (e) {
        if (e.name === 'SequelizeValidationError') {
            return res.status(400).send({ error: 'El dato del email, No es un correo' })
        }
        else if (e.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).send({ error: 'El email que deseas ingresar ya existe' })
        }
        res.status(500).send(e);
    }
};



//Actualizar usuarios
async function updateUsers(req, res) {
    const allowedUpdates = ['name', 'surname', 'email', 'password'];
    const updatesKeys = Object.keys(req.body);
    try {
        //buacar usuario
        const p = req.body;
        const user = await User.findByPk(req.params.id);

        //validar si existe
        if (!user) {
            return res.status(400).send({ error: 'El User No Existe' })
        }
        if (p.name || p.surname || p.email || p.password) {
            const userChange = await User.update(req.body, {
                where: {
                    id: user.id
                },
                individualHooks: true
            });
            if (userChange) {
                const data = await User.findByPk(user.id);
                return res.status(200).send({ data });
            }
        } else return res.status(400).send({ error: 'Act Invalida' })

        //capturamos errores
    } catch (e) {
        console.log(e)
        return res.status(400).send({ error: 'Datos errados' })
    }
};

//Eliminar Usuario
async function deleteUsers(req, res){
    try {

        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).send({ error: 'El usuario que desea eliminar no existe' });
        }
        await User.destroy({
            where: {
                id: user.id
            }
        })
        res.send({ message: 'Usuario Borrado' });

    } catch (e) {
        res.status(500).send();

    }
};


module.exports = {getUsers, addUsers, updateUsers, deleteUsers};
