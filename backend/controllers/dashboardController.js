const pool = require('../config/db');

exports.nurseDashboard = async (req, res) => {
    try{
        if(req.user.rol !== 'enfermero'){
            return res.status(403).json({error: 'No tienes permisos para ver esto.'})
        }
        const todayAttentions = await pool.query(
            'SELECT COUNT(*) FROM attentions WHERE date(attention_date) = CURRENT_DATE'
        );

        const totalAllergies = await pool.query(
            'SELECT COUNT(*) FROM allergies'
        );

        const pendingReports = await pool.query(
            'SELECT COUNT(*) FROM pathologies WHERE added_file IS NULL'
        );


        const recentAttentions = await pool.query(
            `
            SELECT a.id, a.reason, a.attention_date, a.added_file,
            s.name AS student_name, s.surname AS student_surname, s.course
            FROM attentions a 
            JOIN students s
            ON a.student_id = s.id
            ORDER BY 
            a.attention_date DESC
            LIMIT 10
            `
        );

        res.json({
            today_attentions: parseInt(todayAttentions.rows[0].count),
            pending_reports: parseInt(pendingReports.rows[0].count),
            total_allergies: parseInt(totalAllergies.rows[0].count),
            recent_attentions: recentAttentions.rows
        })

    } catch (err){
        console.error(err);
        return res.status(500).json({error: 'Error del servidor.'})
    }
}

exports.parentDashboard = async (req, res) => {
  try {
    const role = req.user.rol;
    const parentId = req.user.id;

    if (role !== "padre") {
      return res.status(403).json({ error: "No tienes permiso." });
    }

    const children = await pool.query(
      `SELECT id, name, surname, course
             FROM students
             WHERE padre_id = $1`,
      [parentId],
    );

    const childrenIds = children.rows.map((child) => child.id);

    if (childrenIds.length === 0) {
      return res.json({
        children: [],
        total_attentions: 0,
        total_allergies: 0,
        recent_attentions: [],
      });
    }

    const totalAttentions = await pool.query(
      `SELECT COUNT(*) 
             FROM attentions
             WHERE student_id = ANY($1)`,
      [childrenIds],
    );

    const totalAllergies = await pool.query(
      `SELECT COUNT(*)
             FROM allergies
             WHERE student_id = ANY($1)`,
      [childrenIds],
    );

    const recentAttentions = await pool.query(
      `SELECT a.id, a.reason, a.attention_date,
       s.name AS student_name,
       s.surname AS student_surname,
       s.course
             FROM attentions a
             JOIN students s ON a.student_id = s.id
             WHERE a.student_id = ANY($1)
             ORDER BY a.attention_date DESC
             LIMIT 10`,
      [childrenIds],
    );

    res.json({
      children: children.rows,
      total_attentions: parseInt(totalAttentions.rows[0].count),
      total_allergies: parseInt(totalAllergies.rows[0].count),
      recent_attentions: recentAttentions.rows,
    });
  } catch (err) {
    console.error("parentDashboard error:", err);
    res.status(500).json({ error: "Error del servidor." });
  }
};