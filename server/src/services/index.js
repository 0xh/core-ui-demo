const messages = require("./messages/messages.service.js");
const notifications = require("./notifications/notifications.service.js");
const vehicles = require("./vehicles/vehicles.service.js");
const models = require("./models/models.service.js");
const users = require("./users/users.service.js");
// eslint-disable-next-line no-unused-vars
module.exports = function(app) {
  app.service("/authentication").hooks({
    after: {
      create: [
        context => {
          context.result.user = {
            id: context.params.user._id,
            name: context.params.user.name
          };
        }
      ]
    }
  });
  app.configure(messages);
  app.configure(notifications);
  app.configure(vehicles);
  app.configure(models);
  app.configure(users);
};
