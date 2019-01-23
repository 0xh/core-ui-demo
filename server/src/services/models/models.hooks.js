const { authenticate } = require("@feathersjs/authentication").hooks;

function associationHook(context) {
  const sequelize = context.app.get("sequelizeClient");
  const { vehicles } = sequelize.models;

  context.params.sequelize = {
    include: [vehicles],
    raw: false
  };
  return context;
}

module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [associationHook],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
