const Dustbin = require("../models/Dustbin");

exports.getOptimalRoute = async (req,res)=>{

try{

const bins = await Dustbin.find();

/* GET FULL BINS */

const fullBins = bins.filter(bin => bin.wasteLevel > 10);

/* SORT BY PRIORITY */

fullBins.sort((a,b)=>b.wasteLevel-a.wasteLevel);

res.json(fullBins);

}catch(err){

res.status(500).json({error:err.message})

}

}