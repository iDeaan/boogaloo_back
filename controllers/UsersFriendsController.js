const models = require('../models');
const Controller = require('./Controller');

class UsersFriendsController extends Controller {
  constructor(req, res) {
    super();
    this.req = req;
    this.res = res;
  }

  getAction() {
    const { userId } = this.req.urlParams;

    models.UsersFriends.findAndCountAll({
      where: {
        user_id: userId
      }
    }).then((response) => {
      if (!response.count) {
        this.code = 404;
      }
      this.response = response.rows;
      this.returnInformation();
    });
  }
}

module.exports = UsersFriendsController;
