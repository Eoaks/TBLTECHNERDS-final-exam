const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    },
    contacts: [
        { type: Schema.Types.ObjectId, ref: 'Contact' }
    ]
}, {
    timestamps: true
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, 8);
};

userSchema.methods.checkPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;