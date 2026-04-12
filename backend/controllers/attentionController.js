const pool = require('../config/db');
const PDFDocument = require('pdfkit');

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


exports.getAttentionByMyChildren = async (req, res) => {
    try{
        const padre_id = req.user.id;

        const result = await pool.query(
            `
                SELECT a.*, s.name AS student_name, s.surname AS student_surname, s.course
                FROM attentions a 
                JOIN students s ON a.student_id = s.id
                WHERE padre_id = $1
                ORDER BY a.attention_date DESC
                `,
                [padre_id]
            );

            res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Error del servidor.'});
    }
}


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


const drawStudentHeader = (doc, student) => {
    doc
      .fontSize(20)
      .font("Helvetica-Bold")
      .text("Enfermería Escolar", { align: "center" });
    doc.moveDown(0.5);
    doc
      .fontSize(10)
      .font("Helvetica")
      .fillColor("#666")
      .text(`Generado el ${new Date().toLocaleDateString("es-ES")}`, {
        align: "center",
      });
    doc.moveDown(1);

    doc
      .fontSize(12)
      .font("Helvetica-Bold")
      .fillColor("#000")
      .text("Datos del alumno");
    doc.moveDown(0.3);
    doc.fontSize(10).font("Helvetica").fillColor("#333");
    doc.text(`Nombre: ${student.name} ${student.surname}`);
    doc.text(`Curso: ${student.course}`);
    if (student.birthdate) {
      doc.text(
        `Fecha de nacimiento: ${new Date(student.birthdate).toLocaleDateString("es-ES")}`,
      );
    }
    doc.moveDown(1);
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke("#ccc");
    doc.moveDown(1);
}

exports.generateAttentionPdf = async (req, res) => {
    try{
        const { id } = req.params;

        const result = await pool.query(
            `
            SELECT a.*, s.name, s.surname, s.course, s.birthdate,
            u.name AS nurse_name
            FROM attentions a
            JOIN students s ON a.student_id = s.id
            JOIN users u ON a.enfermero_id = u.id
            WHERE a.id = $1
            `, [id]
        );

        if(result.rows.length === 0) {
            return res.status(404).json({error: 'Atención no encontrada'});
        }

        const att = result.rows[0];
        const doc = new PDFDocument({margin: 50});

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename=atencion_${id}.pdf`);
        doc.pipe(res);

        drawStudentHeader(doc, att);
        doc
          .fontSize(14)
          .font("Helvetica-Bold")
          .fillColor("#000")
          .text("Informe de Atención");
        doc.moveDown(0.5);

        doc.fontSize(10).font("Helvetica").fillColor("#333");
        doc.text(
          `Fecha: ${new Date(att.attention_date).toLocaleString("es-ES")}`,
        );
        doc.text(`Enfermero/a: ${att.nurse_name}`);
        doc.moveDown(0.5);

        doc.font("Helvetica-Bold").text("Motivo:");
        doc.font("Helvetica").text(att.reason);
        doc.moveDown(0.5);

        doc.font("Helvetica-Bold").text("Actuación:");
        doc.font("Helvetica").text(att.actuation);
        doc.moveDown(0.5);

        if (att.actuation_description) {
          doc.font("Helvetica-Bold").text("Descripción detallada:");
          doc.font("Helvetica").text(att.actuation_description);
        }

        doc.end();

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Error generando el PDF" });
    }
}

exports.generateHistoryPdf = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await pool.query("SELECT * FROM students WHERE id = $1", [
      studentId,
    ]);

    if (student.rows.length === 0) {
      return res.status(404).json({ error: "Alumno no encontrado" });
    }

    const attentions = await pool.query(
      `SELECT a.*, u.name AS nurse_name
             FROM attentions a
             JOIN users u ON a.enfermero_id = u.id
             WHERE a.student_id = $1
             ORDER BY a.attention_date DESC`,
      [studentId],
    );

    if (attentions.rows.length === 0) {
      return res.status(404).json({ error: "No hay atenciones registradas" });
    }

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename=historial_${studentId}.pdf`,
    );
    doc.pipe(res);

    drawStudentHeader(doc, student.rows[0]);

    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .fillColor("#000")
      .text(`Historial de Atenciones (${attentions.rows.length})`);
    doc.moveDown(1);

    attentions.rows.forEach((att, index) => {
      if (doc.y > 680) doc.addPage();

      doc
        .fontSize(11)
        .font("Helvetica-Bold")
        .fillColor("#000")
        .text(
          `${index + 1}. ${new Date(att.attention_date).toLocaleString("es-ES")}`,
        );
      doc.moveDown(0.3);

      doc.fontSize(10).font("Helvetica").fillColor("#333");
      doc.text(`Enfermero/a: ${att.nurse_name}`);
      doc.text(`Motivo: ${att.reason}`);
      doc.text(`Actuación: ${att.actuation}`);

      if (att.actuation_description) {
        doc.text(`Descripción: ${att.actuation_description}`);
      }

      doc.moveDown(0.5);
      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke("#eee");
      doc.moveDown(0.5);
    });

    doc.end();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error generando el PDF" });
  }
};