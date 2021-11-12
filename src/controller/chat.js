const helper = require('../helper/response');
const {
  getChatByIdUserModel,
  postChatModel,
  deleteChatByIdModel,
} = require('../model/chat');

module.exports = {
  postChat: async (request, response) => {
    try {
      const { user_id, user_name, chat_content, rsvp } = request.body;
      const setData = {
        user_id: user_id,
        user_name: user_name,
        chat_content: chat_content,
        rsvp: rsvp,
        created_at: new Date(),
      };
      const result = await postChatModel(setData);
      return helper.response(response, 200, 'Success Post Chat', result);
    } catch (error) {
      console.log(error);
      return helper.response(response, 400, 'Bad Request', error);
    }
  },
  getChatByUserId: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await getChatByIdUserModel(id);
      if (result.length > 0) {
        return helper.response(response, 200, 'Success Get Chat By Id', result);
      } else {
        return helper.response(response, 404, `Chat By Id : ${id} Not Found`);
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error);
    }
  },
  deleteChatById: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await deleteChatByIdModel(id);
      return helper.response(
        response,
        200,
        'Success Delete Chat By Id',
        result
      );
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error);
    }
  },
};
