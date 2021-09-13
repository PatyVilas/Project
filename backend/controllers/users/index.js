const newUser = require('./newUser');
const validateUser = require('./validateUser');
const getUser = require('./getUser');
const loginUser = require('./loginUser');
const editUser = require('./editUser');
const editPassword = require('./editPassword');
const recoverPass = require('./recoverPass');
const resetUserPass = require('./resetUserPass');
const deleteUser = require('./deleteUser');
const addAvatar = require('./addAvatar');



module.exports = {
    newUser,
    validateUser,
    getUser,
    loginUser,
    editUser,
    editPassword,
    recoverPass,
    resetUserPass,
    deleteUser,
    addAvatar,
};