const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//--------------
//REGISTRAR NUEVO USUARIO
//--------------

exports.register = async (req, res) => {
    const CODES = {
        enfermero: process.env.ENF_CODE,
        direccion: process.env.DIR_CODE
    }

    try{
        const {name, email, password, rol, key} = req.body;
        if(!name || !email || !password || !rol){
            return res.status(400).json({error: 'Faltan campos obligatorios'});
        }
        if(rol !== 'padre'){
            if(!key || key !== CODES[rol]){
                return res.status(403).json({error: 'Código de invitación incorrecto'})
            }
        }

        const exist = await pool.query(
            'SELECT id FROM users WHERE email = $1', [email]
        );

        if(exist.rows.length > 0){
            return res.status(409).json({ error: "Email ya registrado" });
        } 
        const hash = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (name, email, password_hash, rol) VALUES ($1, $2, $3, $4) RETURNING id, name, email, rol',
            [name, email, hash, rol]
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
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if(result.rows.length === 0) {
            return res.status(400).json({error: 'Credenciales incorrectas'});
        }

        const user = result.rows[0];
        
        const match = await bcrypt.compare(password, user.password_hash);
        if(!match){
            return res.status(401).json({error: 'Credenciales incorrectas'});
        }

        const token = jwt.sign(
            { id: user.id, rol: user.rol},
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        );

        res.json({
            token,
            user: {
                id: user.id,
                nombre: user.name,
                email: user.email,
                rol: user.rol

            }
        });
    } catch (err){
        console.error(err);
        res.status(500).json({error: 'Error del servidor'})
    }
};