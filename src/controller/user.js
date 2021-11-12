// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
const helper = require('../helper/response');
const fs = require('fs');
const {
  registerUserModel,
  checkUserIdModel,
  getUserByIdModel,
  patchUserModel,
  getAllUserModel,
  deleteUserModel,
} = require('../model/user');

module.exports = {
  registerUser: async (request, response) => {
    try {
      const {
        firstName,
        lastName,
        dateOfBirth,
        phoneNumber,
        emailAddress,
        provinceAddress,
        cityAddress,
        streetAddress,
        zipCode,
        ktpNumber,
        position,
        currentBankAcc,
        bankAccNumber,
      } = request.body;

      console.log(request.body);

      newPic = request.file?.filename;

      const setData = {
        firstName,
        lastName,
        dateOfBirth,
        phoneNumber,
        emailAddress,
        provinceAddress,
        cityAddress,
        streetAddress,
        zipCode,
        ktpNumber,
        position,
        currentBankAcc,
        bankAccNumber,
        ktpImage: newPic ? newPic : null,
        createdAt: new Date(),
      };

      const result = await registerUserModel(setData);
      return helper.response(response, 200, 'Success Post User', result);
    } catch (error) {
      console.log(error);
      return helper.response(response, 400, 'Bad Request', error);
    }
  },
  getUserById: async (request, response) => {
    try {
      const { userId } = request.params;
      const result = await getUserByIdModel(userId);
      if (result.length > 0) {
        return helper.response(response, 200, 'Success Get User By Id', result);
      } else {
        return helper.response(response, 404, `User By Id : ${id} Not Found`);
      }
    } catch (error) {
      console.log(error);
      return helper.response(response, 400, 'Bad Request', error);
    }
  },
  updateUser: async (request, response) => {
    try {
      const { userId } = request.params;
      const {
        firstName,
        lastName,
        dateOfBirth,
        phoneNumber,
        emailAddress,
        provinceAddress,
        cityAddress,
        streetAddress,
        zipCode,
        ktpNumber,
        position,
        currentBankAcc,
        bankAccNumber,
      } = request.body;

      let newPic;
      const user = await checkUserIdModel(userId);

      if (request.file === undefined) {
        newPic = user[0].ktpImage;
      } else {
        newPic = request.file?.filename;
        if (user[0].ktpImage) {
          fs.unlink(`./uploads/${user[0].ktpImage}`, function (err) {
            if (err) throw err;
            console.log('File deleted!');
          });
        }
      }

      const setData = {
        firstName,
        lastName,
        dateOfBirth,
        phoneNumber,
        emailAddress,
        provinceAddress,
        cityAddress,
        streetAddress,
        zipCode,
        ktpNumber,
        position,
        currentBankAcc,
        bankAccNumber,
        ktpImage: newPic,
        updatedAt: new Date(),
      };

      const result = await patchUserModel(setData, userId);

      return helper.response(
        response,
        200,
        'Success Update Employee Profile',
        result
      );
    } catch (error) {
      console.log(error);
      return helper.response(response, 400, 'Bad Request', error);
    }
  },
  getAllUser: async (request, response) => {
    try {
      let { firstName } = request.query;
      // console.log(request.query);
      const result = await getAllUserModel(firstName);
      return helper.response(response, 200, 'Success Get Employers', result);
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error);
    }
  },
  deleteUser: async (request, response) => {
    try {
      const { userId } = request.params;
      const checkId = await getUserByIdModel(userId);

      if (checkId.length > 0) {
        if (checkId.ktpImage !== undefined && checkId.ktpImage !== null) {
          fs.unlink(`./uploads/${checkId[0].ktpImage}`, (err) => {
            if (err) throw err;
            console.log('Success delete image');
          });
        }
        const result = await deleteUserModel(userId);
        return helper.response(
          response,
          200,
          'Success Delete Employee',
          result
        );
      } else {
        return helper.response(
          response,
          404,
          `Employee By Id : ${userId} Not Found`
        );
      }
    } catch (error) {
      console.log(error);
      return helper.response(response, 400, 'Bad Request', error);
    }
  },
};
