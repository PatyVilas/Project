const newEntrySchema = require('./entries/newEntrySchema');
const getEntrySchema = require('./entries/getEntrySchema');
const listEntriesSchema = require('./entries/listEntriesSchema');
const editEntrySchema = require('./entries/editEntrySchema');
const addPhotoEntrySchema = require('./entries/addPhotoEntrySchema');
const voteEntrySchema = require('./entries/voteEntrySchema');
const comentEntrySchema = require('./entries/comentEntrySchema');
const reportEntrySchema = require('./entries/reportEntrySchema');
const deleteEntryPhotoScheme = require('./entries/deleteEntryPhoto');
const deleteEntrySchema = require('./entries/deleteEntry');


const newUserSchema = require('./users/newUserSchema');
const getUserSchema = require('./users/getUserSchema');
const loginUserSchema = require('./users/loginUserSchema');
const editUserSchema = require('./users/editUserSchema');
const editPasswordSchema = require('./users/editPasswordSchema');
const validateUserSchema = require('./users/validateUserSchema');
const recoverPassSchema = require('./users/recoverPassSchema');
const resetUserPassSchema = require('./users/resetUserPassSchema');
const deleteUserSchema = require('./users/deleteUser');


module.exports = {
    newEntrySchema,
    getEntrySchema,
    listEntriesSchema,
    editEntrySchema,
    addPhotoEntrySchema,
    voteEntrySchema,
    comentEntrySchema,
    reportEntrySchema,
    deleteEntryPhotoScheme,
    deleteEntrySchema,

    newUserSchema,
    getUserSchema,
    loginUserSchema,
    editUserSchema,
    editPasswordSchema,
    validateUserSchema,
    recoverPassSchema,
    resetUserPassSchema,
    deleteUserSchema,
};