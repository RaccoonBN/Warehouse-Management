const mysql = require('mysql2/promise');

// Cấu hình connection pool MySQL trên XAMPP
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',        
    password: '',        
    database: 'warehouse_management', 
    waitForConnections: true, 
    connectionLimit: 10,   
    queueLimit: 0        
});

console.log('✅ Connection pool MySQL created!');

module.exports = pool;