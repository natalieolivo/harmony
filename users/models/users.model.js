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

// why do we need this method on the schema
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

exports.findById = id => {
  return User.findById(id).then(result => {
    result = result.toJSON();
    delete result._id;
    delete result.__v;
    return result;
  });
};

exports.patchUser = (id, userData) => {
  return new Promise((resolve, reject) => {
    User.findById(id, (error, user) => {
      if (error) {
        reject(error);
      }
      for (let i in userData) {
        user[i] = userData[i];
      }

      user.save((error, updatedUser) => {
        if (error) {
          return reject(error);
        }
        resolve(updatedUser);
      });
    });
  });
};

exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    User.find()
      .limit(perPage)
      .skip(perPage * page)
      .exec((error, users) => {
        if (error) {
          reject(error);
        } else {
          resolve(users);
        }
      });
  });
};

exports.deleteOneById = userId => {
  return new Promise((resolve, reject) => {
    User.deleteOne({ _id: userId }, error => {
      if (error) {
        reject(error);
      } else {
        resolve(userId);
      }
    });
  });
};
