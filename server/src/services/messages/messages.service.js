// Initializes the `messages` service on path `/messages`
const { Service } = require("feathers-mongoose");
const createModel = require("../../models/messages.model");
const hooks = require("./messages.hooks");

class MessageService extends Service {
  async find(params) {
    let data = super.find(params);
    data.then(data =>
      data.data.map((element, index) => (element.index = index))
    );

    // console.log(params.user);

    // this.Model.findOne({ text: "test" }, function(err, data) {
    //   console.log(data);
    // });

    return data;
  }

  async get(id, params) {
    return super.get(id, params);
  }

  async create(data, params) {
    return super.create(data, params);
  }

  async update(id, data, params) {
    return super.update(id, data, params);
  }

  async patch(id, data, params) {
    return super.patch(id, data, params);
  }

  async remove(id, params) {
    return super.remove(id, params);
  }
}

module.exports = function(app) {
  const Model = createModel(app);
  const paginate = app.get("paginate");

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use("/messages", new MessageService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service("messages");

  service.hooks(hooks);
};
