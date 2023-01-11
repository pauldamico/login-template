const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

userSchema.pre("save", function (next) {
  if (!this.isModified) {
    return next();
  }
  bcrypt.hash(this.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    this.password = hash;
  });
  return next();
});


userSchema.methods.checkPassword = function (passwordAttempt, callback){  
bcrypt.compare(passwordAttempt, this.password, (err, isMatch)=>{

if(err){
    return callback(err)
}
return callback(null, isMatch)

})
}

userSchema.methods.removePassword = function (){
  const user = this.toObject()
  delete user.password
  return user
}

module.exports = mongoose.model("User", userSchema);
