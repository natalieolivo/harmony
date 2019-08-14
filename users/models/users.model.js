const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// This will define the shape of the documents
// in my mongo collection
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  permissionLevel: Number
});

const User = mongoose.model("Users", userSchema);

//connect to the local db
mongoose.connect("mongodb://localhost/harmony");

userSchema.virtual("id").get(function() {
  return this._id.toHexString();
});

// ensure virtuals are serialized
userSchema.set("toJSON", {
  virtuals: true
});

userSchema.findById = cb => {
  return this.model("Users").find({ id: this.id }, cb);
};

exports.findByEmail = email => {
  return User.find({ email: email });
};

exports.createUser = userData => {
  // creating a new document,
  // which is an instance of a mongoose model
  // which will get saved to the db
  const user = new User(userData);
  return user.save();
};
