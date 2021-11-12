const connection = require('../config/mysql');

module.exports = {
  registerUserModel: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO user SET ?', setData, (error, result) => {
        if (!error) {
          const newResult = {
            userId: result.insertId,
            ...setData,
          };
          // delete newResult.user_password;
          resolve(newResult);
        } else {
          reject(new Error(error));
        }
      });
    });
  },
  checkUserIdModel: (userId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM user WHERE userId = ?',
        userId,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  patchUserModel: (setData, userId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE user SET ? WHERE userId = ?',
        [setData, userId],
        (error, result) => {
          if (!error) {
            const newResult = {
              userId: result.userId,
              ...setData,
            };
            resolve(newResult);
          } else {
            console.log(error);
            reject(new Error(error));
          }
        }
      );
    });
  },
  getUserByIdModel: (userId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM user WHERE userId = ?',
        userId,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getAllUserModel: (firstName) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM user WHERE firstName LIKE '%${firstName}%' ORDER BY createdAt DESC`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  deleteUserModel: (userId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `DELETE from user WHERE userId = ?`,
        userId,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
};
