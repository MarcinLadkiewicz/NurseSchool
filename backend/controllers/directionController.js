const pool = require("../config/db");

//-----------------------
//ALL ATTENTIONS
//-----------------------

exports.getAllAttentions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1 ) * limit;

    const count = await pool.query('SELECT COUNT(*) FROM attentions');
    const total = parseInt(count.rows[0].count);

    const result = await pool.query(
        `
        SELECT a.*, s.name AS student_name, s.surname AS student_surname 
         FROM attentions
         JOIN students s ON a.student_id = s.id 
         ORDER BY attention_date 
         LIMIT $1 OFFSET $2
         `,
         [limit, offset]
    );

    res.json({
        data: result.rows, 
        total,
        page,
        pages: Math.ceil(total / limit)
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error del servidor." });
  }
};

//-----------------------
//ALL ALLERGYS
//-----------------------

exports.getAllAllergies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const count = await pool.query('SELECT COUNT(*) FROM allergies');
    const total = parseInt(count.rows[0].count);

    const result = await pool.query(
        `
        SELECT a.*, s.name AS student_name, s.surname AS student_surname 
        FROM allergies a
        JOIN students s ON
        a.student_id = s.id
        ORDER BY alergy_type
        LIMIT $1
        OFFSET $2
        `,
        [limit, offset]   
    );

    res.json({
        data: result.rows,
        total,
        page,
        pages: Math.ceil(total/limit)
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error del servidor." });
  }
};

//-----------------------
//SUMMARY
//-----------------------

exports.summary = async (req, res) => {
  try {
    const attention = await pool.query('SELECT COUNT(*) FROM attentions');
    const students = await pool.query('SELECT COUNT(DISTINCT student_id) FROM attentions');
    const allergies = await pool.query('SELECT COUNT(*) FROM allergies');

    res.json({
        total_attentions: parseInt(attention.rows[0].count),
        students_attended: parseInt(students.rows[0].count),
        total_allergies: parseInt(allergies.rows[0].count)
    });
    
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error del servidor." });
  }
};