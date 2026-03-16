const pool = require('../config/db');

exports.dashboard = async (req, res) => {
    try{
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