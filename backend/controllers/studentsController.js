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
                `SELECT s.*, COUNT(a.id) AS allergy_count
                 FROM students s
                 LEFT JOIN allergies a ON
                 a.student_id = s.id
                 WHERE name ILIKE $1 
                 ORDER BY name`,
                [`%${name}%`]
            );
        } else {
            result = await pool.query(
                `SELECT s.*, COUNT(a.id) AS allergy_count
                 FROM students s 
                 LEFT JOIN allergies a ON
                 a.student_id = s.id
                 GROUP BY s.id
                 ORDER BY id`
            )
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
            `SELECT s.*, u.name AS parent_name, u.email AS parent_email
             FROM students s 
             LEFT JOIN users u
             ON s.padre_id = u.id
             WHERE s.id = $1`, [id]
        );

        if(student.rows.length === 0) {
            return res.status(404).json({error: 'Alumno no encontrado'});
        }

        const allergy = await pool.query(
            'SELECT * FROM allergies WHERE student_id= $1', [id]
        );
        const pathology = await pool.query(
            'SELECT * FROM pathologies WHERE student_id= $1', [id]
        );
        const attention = await pool.query(
            'SELECT * FROM attentions WHERE student_id = $1 ORDER BY attention_date DESC', [id]
        );


        res.json({
          student: student.rows[0],
          allergies: allergy.rows,
          pathologies: pathology.rows,
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
        if(!name || !surname || !course || !birthdate){
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
            [ name, surname, course, birthdate, padre_id || null] 
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
        const {name, surname, course, birthdate, padre_id} = req.body;

        const current = await pool.query(
            'SELECT * FROM students WHERE id=$1', [id]
        );
        if(current.rows.length === 0){
            return res.status(404).json({error: 'Alumno no encontrado'});
        }

        const student = current.rows[0];

        const result = await pool.query(
            'UPDATE students SET name=$1, surname=$2, course=$3, birthdate=$4, padre_id=$5 WHERE id=$6 RETURNING *', 
            [name || student.name, surname||student.surname, course||student.course, birthdate||student.birthdate,padre_id||student.padre_id, id]
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

exports.getParents = async (req, res) => {

    try{
        const result = await pool.query(
            `SELECT id, name, email FROM users WHERE rol='padre' ORDER BY name`
        );

        res.json(result.rows);
    } catch(err){
        console.error(err);
        return res.status(500).json({error: 'Error del servidor.'})
    }
}