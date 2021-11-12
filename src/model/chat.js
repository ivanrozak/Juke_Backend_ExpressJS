const connection = require('../config/mysql');

module.exports = {
  getChatByIdUserModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM chat WHERE user_id = ? ORDER BY created_at DESC',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  postChatModel: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO chat SET ?', setData, (error, result) => {
        if (!error) {
          const newResult = {
            chat_id: result.insertId,
            ...setData,
          };
          resolve(newResult);
        } else {
          reject(new Error(error));
        }
      });
    });
  },
  deleteChatByIdModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM chat WHERE chat_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
};
