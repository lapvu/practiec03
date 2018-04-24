require('dotenv').config()
const mongoose = require('mongoose');
module.exports = mongoose.connect(process.env.DATABASE)