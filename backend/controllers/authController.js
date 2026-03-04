const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//--------------
//REGISTRAR NUEVO USUARIO
//--------------

exports.register = async (req, res) => {
    try{
        const {nombre, email, password, rol} = req.body;
        if(!nombre || !email || !password || !rol){
            return res.status(400).json({error: 'Faltan campos obligatorios'});
        }

        const exist = await pool.query(
            'SELECT id FROM usuarios WHERE email = $1', [email]
        );

        if(exist.rows.length > 0){
            return res.status(409).json({ error: "Email ya registrado" });
        } 
        const hash = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES ($1, $2, $3, $4) RETURNING id, nombre, email, rol',
            [nombre, email, hash, rol]
        ); 
        res.status(201).json({
            mensaje: 'Usuario creado', 
            user: result.rows[0]
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Error del servidor'});
    }
};

//---------------
//LOGIN: AUTENTICAR USUARIO EXISTENTE
//---------------

exports.login = async (req, res) =>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({error: 'Email y contraseña requeridos'});
        }

        const result = await pool.query(
            'SELECT * FROM usuarios WHERE email = $1',
            [email]
        );

        if(result.rows.length === 0) {
            return res.status(400).json({error: 'Credenciales incorrectas'});
        }

        const usuario = result.rows[0];

        const coincide = await bcrypt.compare(password, usuario.password_hash);
        if(!coincide){
            return res.status(401).json({Error: 'Credenciales incorrectas'});
        }

        const token = jwt.sign(
            { id: usuario.id, rol: usuario.rol},
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        );

        res.json({
            token,
            user: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol
            }
        });
    } catch (err){
        console.error(err);
        res.status(500).json({error: 'Error del servidor'})
    }
};