const models = require('../models');

const Controller = require('./Controller');

class UsersNotReadMessagesController extends Controller {
  constructor(req, res) {
    super();
    this.req = req;
    this.res = res;
  }

  getAction() {
    const { req } = this;
    const { userData } = req;

    models.ChatsUsers.findAll({
      where: {
        user_id: userData.user_id
      },
      include: ['chats']
    }).then((usersChats) => {
      const resultInformation = [];
      let totalNotReadMessages = 0;
      const promises = [];

      usersChats.forEach((item) => {
        promises.push(
          models.ChatsMessages.findAndCountAll({
            where: {
              id: {
                $between: [item.last_read_message_id, item.chats.last_message_id]
              },
              chat_id: item.chat_id
            }
          }).then((notReadMessages) => {
            let responseData = {
              chatId: item.chat_id,
              messagesCount: notReadMessages.count - 1
            };
            totalNotReadMessages += notReadMessages.count - 1;
            resultInformation.push(responseData);
          })
        );
      });

      return Promise.all(promises).then(() => {
        this.response = { total: totalNotReadMessages, chatsData: resultInformation };
        this.returnInformation();
      });
    }).catch(() => {
      this.code = 404;
      this.returnInformation();
    });
  }
}

module.exports = UsersNotReadMessagesController;
