const { app } = require('./index.js');
const dbAccess = require('./db.js');

const db = dbAccess.db;
// needed for google cloud hosting
const PORT = process.env.PORT || 3000;

// Initialize database tables
db.serialize(() => {
  db.run(dbAccess.createUserTable, (err) => {
    if (err) {
      console.log('Error creating user table:', err.message);
    }
  });

  db.run(dbAccess.createAttendanceTable, (err) => {
    if (err) {
      console.log('Error creating attendance table:', err.message);
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
