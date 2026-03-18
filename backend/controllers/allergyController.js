const pool = require("../config/db");

//-------------------
// LIST ALL ALLERGYS
//-------------------

exports.getAllAllergies = async (req, res) => {
  try {

    const {allergy_type, severity} = req.query;
    let query = `SELECT a.*, s.name AS student_name, s.surname AS student_surname, s.course FROM
    allergies a
    JOIN students s ON
    a.student_id = s.id
    `
    ;
    const params = [];

    if(allergy_type && severity) {
        query += ' WHERE a.allergy_type = $1 AND a.severity =$2';
        params.push(allergy_type, severity);
    } else if(allergy_type){
        query += ' WHERE a.allergy_type =$1';
        params.push(allergy_type);
    } else if(severity) {
        query += ' WHERE a.severity = $1';
        params.push(severity);
    }

    

    const result = await pool.query(query, params);
    res.json(result.rows)

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

//------------------
//LIST ALLERGYS BY STUDENT ID
//------------------

exports.getAllergyByStudentId = async (req, res) => {
  try {

    const {student_id} = req.params;
     if(req.user.rol === 'padre'){
        const student = await pool.query(
            'SELECT padre_id FROM students WHERE id = $1',[student_id] 
        );
        if(student.rows[0]?.padre_id != req.user.id){
            return res.status(403).json({error: 'No tienes acceso a este alumno'});
        }
     }

    const result = await pool.query(
        'SELECT * FROM allergies WHERE student_id = $1', [student_id]
    );

    if(result.rows.length === 0){
        return res.status(404).json({error: 'Alumno sin alergias.'})
    }

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

//------------------
//REGISTER ALLERGY
//------------------

exports.registerAllergy = async (req, res) => {
  try {
    const {student_id, allergy_type, allergy_description, severity } = req.body;

    if(!student_id || !allergy_type || !allergy_description || !severity){
        return res.status(400).json({error: 'Faltan campos obligatorios'});
    }

    const student = await pool.query(
        'SELECT * FROM students WHERE id = $1', [student_id]
    );

    if(student.rows.length === 0){
        return res.status(404).json({error: 'Alumno no encontrado'});
    }

    const result = await pool.query(
        'INSERT INTO allergies (student_id, allergy_type, allergy_description, severity) VALUES($1, $2, $3, $4)RETURNING * ',
        [student_id, allergy_type, allergy_description, severity]
    );

    return res.status(201).json({
        message: 'Alergia Registrada',
        result: result.rows[0]
    })

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

//------------------
//UPDATE ALLERGY
//------------------

exports.updateAllergy = async (req, res) => {
  try {
    const { id } = req.params;
    const { allergy_type, allergy_description, severity} = req.body;

    const current = await pool.query(
        'SELECT * FROM allergies WHERE id = $1',
        [id]
    );

    if(current.rows.length === 0){
        return res.status(404).json({error: 'Alergia no encontrada'});
    }

    const allergy = current.rows[0];
    const result = await pool.query(
        'UPDATE allergies SET allergy_type=$1, allergy_description=$2, severity=$3 WHERE id=$4 RETURNING *',
        [allergy_type || allergy.allergy_type, allergy_description || allergy.allergy_description, severity || allergy.severity, id ]
    );
    
    return res.json({
        message: 'Alergia actualizada',
        result: result.rows[0]
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

//------------------
//DELETE ALLERGY
//------------------

exports.deleteAllergy = async (req, res) => {
  try {
    const {id} = req.params;

    const result = await pool.query(
        'DELETE FROM allergies WHERE id = $1',
        [id]
    );

    if(result.rowCount === 0){
        return res.status(404).json({error: 'Alergia no encontrada'});
    }

    res.json({message: 'Alergia eliminada.'})
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error del servidor" });
  }
};


//--- FALTA MANEJO DE ARCHIVOS CON MULTER, SE HARÁ DESPUES