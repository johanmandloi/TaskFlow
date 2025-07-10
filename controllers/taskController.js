import db from '../db/db.js';

// GET /api/v1/tasks/:id with optional ?mobile=true
export const getTaskById = (req, res) => {
  const { id } = req.params;
  const isMobile = req.query.mobile === 'true';

  const sql = `
    SELECT 
      t.*, 
      u.name AS assignee_name, 
      p.name AS project_name 
    FROM tasks t 
    LEFT JOIN users u ON t.assignee_id = u.id 
    LEFT JOIN projects p ON t.project_id = p.id 
    WHERE t.id = ?
  `;

  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Task not found' });

    const task = results[0];

    if (isMobile) {
      const trimmed = {
        id: task.id,
        title: task.title,
        status: task.status,
        assignee: task.assignee_name
      };
      return res.json({ data: trimmed });
    }

    res.json({ data: task });
  });
};

// POST /api/v1/tasks
export const createTask = (req, res) => {
  const { title, description, status, project_id, assignee_id } = req.body;
  if (!title || !project_id) {
    return res.status(400).json({ message: 'Title and project_id are required' });
  }

  const sql = `
    INSERT INTO tasks (title, description, status, project_id, assignee_id)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [title, description, status || 'pending', project_id, assignee_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Task created', taskId: result.insertId });
  });
};

// POST /api/v1/tasks/:id/comments
export const addComment = (req, res) => {
  const { id } = req.params;
  const { user_id, content } = req.body;

  if (!user_id || !content) {
    return res.status(400).json({ message: 'user_id and content required' });
  }

  const sql = `
    INSERT INTO comments (task_id, user_id, content)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [id, user_id, content], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Comment added' });
  });
};

// GET /api/v1/tasks/:id/comments
export const getCommentsForTask = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT 
      c.*, 
      u.name AS commenter 
    FROM comments c 
    JOIN users u ON c.user_id = u.id 
    WHERE c.task_id = ? 
    ORDER BY c.created_at DESC
  `;

  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ data: results });
  });
};
