const pool = require ('../config/db');

//-------------
//LIST ALL STUDENTS
//-------------



exports.getAll = async (req, res) => {

    try{
        const { name } = req.query;
        
        let result;

        if(name) {
            result = await pool.query(
                'SELECT * FROM students WHERE name ILIKE $1 ORDER BY name',
                [`%${name}%`]
            );
        } else {
            result = await pool.query(
                'SELECT * FROM students ORDER BY name'
            );
        }

        res.json(result.rows); 
    } catch (err){
        console.error(err);
        return res.status(500).json({error: 'Error del servidor'});
    }
}

//--------------------
// STUDENT FULL INFO
//--------------------

exports.getById = async (req, res) => {
    try{
        const { id } = req.params;

        const student = await pool.query(
            'SELECT * FROM students WHERE id = $1', [id]
        );

        if(student.rows.length === 0) {
            return res.status(404).json({error: 'Alumno no encontrado'});
        }

        const allergie = await pool.query(
            'SELECT * FROM allergies WHERE student_id= $1', [id]
        );
        const pathologie = await pool.query(
            'SELECT * FROM pathologies WHERE student_id= $1', [id]
        );
        const attention = await pool.query(
            'SELECT * FROM attentions WHERE student_id = $1 ORDER BY attention_date DESC', [id]
        );


        res.json({
          student: student.rows[0],
          allergies: allergie.rows,
          pathologies: pathologie.rows,
          attentions: attention.rows
        });

    } catch (err){
        console.error(err);
        return res.status(500).json({error: 'Error del servidor'});
    }
}

//---------------------
// CREATE STUDENT
//---------------------

exports.create = async (req, res) => {
    try{
        const {name, surname, course, birthdate, padre_id} = req.body;
        if(!name || !surname || !course || !birthdate || !padre_id){
            return res.status(400).json({error: 'Faltan datos obligatorios'});
        }

        const exist = await pool.query(
            'SELECT * FROM students WHERE name=$1 AND surname=$2', [name, surname]
        ); 

        if(exist.rows.length > 0){
            return res.status(409).json({error: 'Alumno ya existe.'})
        }

        const result = await pool.query(
            'INSERT INTO students (name, surname, course, birthdate, padre_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [ name, surname, course, birthdate, padre_id] 
        );

        res.status(201).json({
            mensaje: 'Alumno creado',
            student: result.rows[0]
        });
    } catch(err){
        console.error(err);
        return res.status(500).json({error: 'Error del servidor'});
    }
}

//----------------
// UPDATE STUDENT
//----------------

exports.update = async (req, res) => {
    try{
        const { id } = req.params;
        const {name, surname, course, birthdate} = req.body;

        const result = await pool.query(
            'UPDATE students SET name=$1, surname=$2, course=$3, birthdate=$4 WHERE id=$5 RETURNING *', 
            [name, surname, course, birthdate, id]
        );
        if(result.rows.length === 0){
            return res.status(404).json({error: 'Alumno no encontrado'});
        }

        res.status(200).json({
            message: 'Alumno actualizado',
            student: result.rows[0]
        })
    } catch(err){
        console.error(err);
        return res.status(500).json({error: 'Error del servidor'})
    }
}

//--------------
//STUDENTBYFATHERID
//--------------

exports.getByFatherId = async (req,res) => {

    try{

        const { padreId } = req.params;
        if(parseInt(padreId) !== req.user.id){
            return res.status(403).json({error: 'Acceso no autorizado'}); 
        }

        const result = await pool.query(
            'SELECT * FROM students WHERE padre_id =$1', 
            [padreId]
        );

        if(result.rows.length === 0){
            return res.status(404).json({error: 'No se encontraron hijos.'});
        }

        res.json(result.rows);
    } catch(err){
        console.error(err);
        return res.status(500).json({error: 'Error del Servidor.'})
    }
}