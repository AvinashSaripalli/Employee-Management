const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 5000;

require('dotenv').config()

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'data_user'
});

db.connect(err => {
  if (err) {
    console.error('MySQL connection error:', err);
    return;
  }
  console.log('MySQL Connected...');
});

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });


app.post("/api/users", upload.single("photo"), (req, res) => {
  const {firstName, lastName, email, phoneNumber, password, companyName, role, designation, department, jobLocation, dateOfBirth, bloodGroup, technicalSkills, employeeId} = req.body;

  const photo = req.file ? `/uploads/${req.file.filename}` : null;

  const query = `INSERT INTO users 
  (firstName, lastName, email, phoneNumber, password, companyName, role, designation, department, jobLocation, dateOfBirth, bloodGroup, photo, technicalSkills, employeeId)VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    query,
    [firstName, lastName, email, phoneNumber, password, companyName, role, designation, department, jobLocation, dateOfBirth, bloodGroup, photo, technicalSkills, employeeId],
    (err, result) => {
      if (err) {
        console.error("MySQL error:", err);
        return res.status(500).json({ error: "Failed on Adding User" });
      }
      res.status(201).json({ message: "User added successfully" });
    }
  );
});


app.post('/api/login', (req, res) => {
  const { email, password,} = req.body;

  // const query = `SELECT * FROM users WHERE email = ? AND companyName = ?`;
  // db.query(query, [email, companyName], (err, results) => {
  //   if (err || results.length === 0) {
  //     return res.status(401).json({ success: false, message: 'Invalid credentials' });
  //   }

  const query = `SELECT * FROM users WHERE email = ? `;
  db.query(query, [email], (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const user = results[0];
    if (user.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const photoUrl = user.photo ? `${req.protocol}://${req.get('host')}${user.photo}` : null;
    res.status(200).json({ 
      success: true, 
      role: user.role,
      photo: photoUrl,
      companyName: user.companyName
    });
  });
});

app.get('/api/users-by-month', (req, res) => {
  const { companyName } = req.query;

  if (!companyName) {
    return res.status(400).json({ error: 'Company name is required' });
  }

  const query = `
    SELECT MONTH(created_at) AS month, COUNT(*) AS userCount 
    FROM users 
    WHERE companyName = ? 
    GROUP BY MONTH(created_at)
  `;

  db.query(query, [companyName], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

app.get('/api/users', (req, res) => {
  const { companyName, role } = req.query;

  if (!companyName) {
    return res.status(400).json({ error: 'Company name is required' });
  }

  let query;
  const values = [companyName];

  if (role === 'Manager') {
    query = `SELECT * FROM users WHERE companyName = ?`;
  } else {
    query = `SELECT * FROM users WHERE companyName = ? AND (role = 'User' OR role = 'Manager')`;
  } 

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ error: 'Error fetching users' });
    }

    const users = results.map(user => ({
      ...user,
      photo: user.photo ? `${req.protocol}://${req.get('host')}${user.photo}` : null,
      technicalSkills: user.technicalSkills ? user.technicalSkills.split(",") : null
    }));

    res.status(200).json(users);
  });
});


app.put('/api/users/:id', upload.single('photo'), (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, companyName, role, designation, email, phoneNumber, department, bloodGroup, technicalSkills, dateOfBirth,jobLocation} = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : null;
  

  const query = `UPDATE users SET firstName = ?, lastName = ?, companyName = ?, role = ?, designation = ?, email = ?, phoneNumber = ?, department= ?, bloodGroup = ?, technicalSkills = ?, dateOfBirth = ?, jobLocation = ?, photo = COALESCE(?, photo) WHERE id = ?`;
  const values = [firstName, lastName, companyName, role, designation, email, phoneNumber, department, bloodGroup, technicalSkills, dateOfBirth,jobLocation, photo, id];

  db.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'User updated successfully!' });
  });
});


app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM users WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting user:', err);
      res.status(500).send('Error deleting user');
      return;
    }
    res.status(200).send('User deleted successfully');
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

