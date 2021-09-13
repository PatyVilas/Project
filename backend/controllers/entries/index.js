const listEntries = require('../entries/listEntries');
const getEntry = require('./getEntry');
const newEntry = require('./newEntry');
const addEntryPhoto = require('./addEntryPhoto');
const voteEntry = require('./voteEntry');
const editEntry = require('./editEntry');
const deleteEntry = require('./deleteEntry');
const deleteEntryPhoto = require('./deleteEntryPhoto');
const comentEntry = require('./comentEntry');
const reportEntry = require('./reportEntry');


module.exports = {
    listEntries,
    getEntry,
    newEntry,
    addEntryPhoto,
    voteEntry,
    editEntry,
    deleteEntry,
    deleteEntryPhoto,
    comentEntry,
    reportEntry,
};