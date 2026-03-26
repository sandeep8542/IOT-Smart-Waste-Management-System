const mongoose = require("mongoose");

const dustbinSchema = new mongoose.Schema({

binId:{
type:String,
required:true,
unique:true
},

location:{
type:String,
required:true
},

latitude:Number,
longitude:Number,

wasteLevel:{
type:Number,
default:0
},

wasteType:{
type:String,
enum:["WET","DRY","PLASTIC","METAL","MIXED"],
default:"MIXED"
},

gasLevel:{
type:Number,
default:10
},

temperature:{
type:Number,
default:25
}

},{timestamps:true});

module.exports = mongoose.model("Dustbin", dustbinSchema);