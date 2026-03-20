const mongoose = require("mongoose");

const connectDB = async()=>{
    await mongoose.connect("mongodb+srv://vimleshkumarchuahan:7NbflpJeXqYxQjLN@devtindercluster.i4fm3im.mongodb.net/devTinder");
};

module.exports = connectDB;

