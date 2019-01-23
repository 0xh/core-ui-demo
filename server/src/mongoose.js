const mongoose = require("mongoose");

module.exports = function(app) {
  mongoose.connect(
    app.get("mongodb"),
    { useNewUrlParser: true }
  );
  mongoose.set("useFindAndModify", false);
  mongoose.set("useCreateIndex", true);
  mongoose.Promise = global.Promise;

  app.set("mongooseClient", mongoose);
};
