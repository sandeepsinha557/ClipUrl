const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required : true,
    },
    email:{
        type:String,
        required: true,
        unquie : true,
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        required:true,
        default:"normal"
    }



},{timestamps:true});

const User = mongoose.model('user', userSchema);

// Expose functions to allow mocking in tests
let originalFindOne = User.findOne;
let originalCreate = User.create;

User._setTestMocks = (findOneMock, createMock) => {
  User.findOne = findOneMock;
  User.create = createMock;
};

User._clearTestMocks = () => {
  User.findOne = originalFindOne;
  User.create = originalCreate;
};

module.exports = User;