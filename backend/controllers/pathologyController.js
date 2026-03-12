const pool = require('../config/db');

//-----------------
//REGISTER PATHOLOGY
//-----------------

exports.registerPathology = async (req, res) => {

    try{   
        const { student_id, pathology_name, pathology_description } = req.body;

        if(!student_id || !pathology_name) {
            return res.status(400).json({error: 'Faltan campos requeridos'});
        }

        const student = await pool.query(
            'SELECT * FROM students WHERE id = $1', 
            [student_id]
        );

        if(student.rows.length === 0){
            return res.status(404).json({error: 'Alumno no encontrado'});
        }

        const result = await pool.query(
            'INSERT INTO pathologies (student_id, pathology_name, pathology_description) VALUES ($1, $2, $3) RETURNING *',
            [student_id, pathology_name, pathology_description || null]
        );

        return res.status(201).json({
            message: 'Patología Registrada',
            result: result.rows[0]
        })


    } catch (err){
        console.error(err);
        return res.status(500).json({error: 'Error del servidor.'})
    }
}

//-----------------
//GET BY STUDENT ID
//-----------------


exports.getByStudentId = async (req, res) => {
  try {

    const {student_id} = req.params;
    if(req.user.rol === 'padre'){
        const student = await pool.query(
            'SELECT padre_id FROM students WHERE id=$1',
            [student_id]
        );
        if(student.rows[0]?.padre_id != req.user.id){
            return res.status(403).json({error: 'No tienes acceso a este alumno'});
        }
    }

    const result = await pool.query(
        'SELECT * FROM pathologies WHERE student_id = $1',
        [student_id]
    );

    if(result.rows.length === 0){
        return res.status(404).json({error: 'Alumno sin patologías'});
    }

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error del servidor." });
  }
};










//-----------------
//UPLOAD FILE
//-----------------