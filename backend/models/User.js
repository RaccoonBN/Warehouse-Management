// backend/models/User.js
const pool = require('../config/db');
const bcrypt = require('bcrypt');

class User {
  constructor(id, username, password, role) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.role = role;
  }

  static async findByUsername(username) {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
      if (rows.length > 0) {
        const row = rows[0];
        return new User(row.id, row.username, row.password, row.role);
      }
      return null;
    } catch (error) {
      console.error('Error finding user by username:', error);
      throw error;
    }
  }

  static async findById(id) {
      try {
          const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
          if (rows.length > 0) {
              const row = rows[0];
              return new User(row.id, row.username, row.password, row.role);
          }
          return null;
      } catch (error) {
          console.error('Error finding user by id:', error);
          throw error;
      }
  }


  async save() {
    try {
      if (this.id) {
        // Update user (not implemented yet)
      } else {
        const [result] = await pool.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [this.username, this.password, this.role]);
        this.id = result.insertId;
      }
    } catch (error) {
      console.error('Error saving user:', error);
      throw error;
    }
  }

  async comparePassword(candidatePassword) {
    try {
      return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
      console.error('Error comparing passwords:', error);
      throw error;
    }
  }
}

module.exports = User;