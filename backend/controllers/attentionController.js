const pool = require('../config/db');

//-----------------------
//LIST ALL ATTENTIONS
//-----------------------

exports.getAllAttentions = async (req, res) => {
  try {
    const { student_id } = req.query;
    const { attention_date } = req.query;

    let result;

    if (student_id) {
      result = await pool.query(
        `SELECT a.*, s.name AS student_name, s.surname AS student_surname, s.course
         FROM attentions a 
         JOIN students s ON a.student_id = s.id
         WHERE a.student_id = $1 ORDER BY attention_date`,
        [student_id],
      );
    } else if (attention_date) {
      result = await pool.query(
        `SELECT a.*, s.name AS student_name, s.surname AS student_surname, s.course
         FROM attentions a
         JOIN students s ON a.student_id = s.id
         WHERE a.attention_date =$1 ORDER BY id`,
        [attention_date],
      );
    } else {
      result = await pool.query(`SELECT a.*, s.name AS student_name, s.surname AS student_surname, s.course
         FROM attentions a 
         JOIN students s ON a.student_id = s.id`
      );
    }

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error del servidor" });
  }
};   


//---------------------
// LIST BY ATTENTION ID
//---------------------

exports.getById = async (req, res) => {

    try{
        
        const {id} = req.params;
        const attention = await pool.query(
            `SELECT 
            a.*,
            s.name AS student_name,
            s.surname AS student_surname, 
            u.name AS nurse_name
            FROM attentions a
            JOIN students s ON a.student_id = s.id
            JOIN users u ON a.enfermero_id = u.id
            WHERE a.id = $1
            `,
            [id]
        );
        if(attention.rows.length === 0){
            return res.status(404).json({error: 'Atención no encontrada.'})
        }

        res.json(attention.rows[0])
    } catch(err){
        console.error(err);
        return res.status(500).json({error: 'Error del servidor'});
    }
}

//------------------------
// LIST BY STUDENT ID
//------------------------ 

exports.getByStudentId = async (req, res) => {
    try{

        const {student_id} = req.params;

        const attention = await pool.query(
            ' SELECT * FROM attentions WHERE student_id = $1', 
            [student_id]
        );

        if(attention.rows.length === 0){
            return res.status(404).json({error: 'Este estudiante no ha sido atendido.'})
        }
        
        res.json(attention.rows);
    }catch(err){
        console.error(err);
        return res.status(500).json({error: 'Error del servidor'});
    }
}

//---------------------
// CREATE ATTENTION
//---------------------


exports.createAttention = async (req, res) => {
    try{

        const {student_id, reason, actuation, actuation_description} = req.body;
        const enfermero_id = req.user.id;

        if(!student_id || !reason || !actuation){
            return res.status(400).json({error: 'Faltan campos obligatorios'});
        }

        const student = await pool.query(
            'SELECT * FROM students WHERE id=$1', [student_id]
        ); 

        if(student.rows.length === 0){
            return res.status(404).json({error: 'Alumno no encontrado'});
        }

        const result = await pool.query(
            'INSERT INTO attentions (student_id, enfermero_id, reason, actuation, actuation_description) VALUES ($1, $2, $3, $4, $5) RETURNING*',
            [student_id, enfermero_id, reason, actuation, actuation_description]
        );
        //Aquí irá la notificación push al padre.

        return res.status(201).json({
            message: 'Atención registrada',
            attention: result.rows[0]
        })
    }catch(err){
        console.error(err);
        return res.status(500).json({error: 'Error del servidor'});
    }
}


