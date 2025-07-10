import db from "../db/db.js";

// GET /projects with optional ?mobile=true
export const getAllProjects = (req, res) => {
  const isMobile = req.query.mobile === 'true';

  const sql = 'SELECT id, name, description, created_at FROM projects';

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (isMobile) {
      const trimmed = results.map(p => ({
        id: p.id,
        name: p.name
      }));
      return res.json({ data: trimmed });
    }

    res.json({ data: results });
  });
};

// GET /projects/:id
export const getProjectById = (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM projects WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: "Project not found" });

    res.json({ data: results[0] });
  });
};

// POST /projects
export const createProject = (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ message: "Project name is required" });

  db.query(
    "INSERT INTO projects (name, description) VALUES (?, ?)",
    [name, description],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Project created successfully", projectId: result.insertId });
    }
  );
};

// GET /projects/:id/analytics with optional ?extended=true
export const getProjectAnalytics = (req, res) => {
  const { id } = req.params;
  const extended = req.query.extended === 'true';

  const baseQuery = `
    SELECT
      COUNT(*) AS total_tasks,
      SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed_tasks,
      SUM(CASE WHEN status != 'completed' THEN 1 ELSE 0 END) AS pending_tasks
    FROM tasks
    WHERE project_id = ?
  `;

  db.query(baseQuery, [id], (err, summary) => {
    if (err) return res.status(500).json({ error: err.message });

    const result = summary[0];
    result.completion_percentage = result.total_tasks > 0
      ? Math.round((result.completed_tasks / result.total_tasks) * 100)
      : 0;

    if (!extended) return res.json({ data: result });

    // Extended analytics: task count per user
    const userQuery = `
      SELECT u.id, u.name, COUNT(t.id) AS task_count
      FROM tasks t
      JOIN users u ON t.assignee_id = u.id
      WHERE t.project_id = ?
      GROUP BY u.id, u.name
    `;

    db.query(userQuery, [id], (err, userStats) => {
      if (err) return res.status(500).json({ error: err.message });
      result.tasks_per_user = userStats;
      res.json({ data: result });
    });
  });
};
