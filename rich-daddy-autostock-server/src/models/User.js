const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

userSchema.index({ email: 1 }, { unique: true });

userSchema.statics.getUser = function(data, options) {
    return options ? this.findOne(data, options) : this.findOne(data);
};

userSchema.statics.createUser = function(user) {
    return new this(user).save();
};

module.exports = model('users', userSchema);