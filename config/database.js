const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'mysql-3b13f1f4-mysql-inemventas2026.h.aivencloud.com',
    port: 12803,
    user: 'avnadmin',
    password: 'AVNS_Cx17-QYRWw4FNp8PrFc',
    database: 'inemVentas',

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,

    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool.promise();