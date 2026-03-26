const Dustbin = require("../models/Dustbin");
const io = require("../server");

/* Helper function */

const calculateStatusPriority = (level) => {

  let status = "empty";
  let priority = "low";

  if (level > 75) {
    status = "full";
    priority = "high";
  }
  else if (level > 40) {
    status = "medium";
    priority = "medium";
  }

  return { status, priority };

};


/* Create Dustbin */

exports.createDustbin = async (req, res) => {

  try {

    const { wasteLevel = 0 } = req.body;

    const { status, priority } = calculateStatusPriority(wasteLevel);

    const dustbin = await Dustbin.create({
      ...req.body,
      status,
      priority
    });

    res.status(201).json(dustbin);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};


/* Get All Dustbins */

exports.getDustbins = async (req, res) => {

  try {

    const bins = await Dustbin.find();

    res.json(bins);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};


/* Update Dustbin */

exports.updateDustbin = async (req, res) => {

  try {

    const { wasteLevel } = req.body;

    let updateData = { ...req.body };

    if (wasteLevel !== undefined) {

      const { status, priority } = calculateStatusPriority(wasteLevel);

      updateData.status = status;
      updateData.priority = priority;

    }

    const bin = await Dustbin.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(bin);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};


/* Delete Dustbin */

exports.deleteDustbin = async (req, res) => {

  try {

    await Dustbin.findByIdAndDelete(req.params.id);

    res.json({ message: "Dustbin deleted" });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};


/* Priority Collection System */

exports.getPriorityBins = async (req, res) => {

  try {

    const bins = await Dustbin.find().sort({ priority: -1, wasteLevel: -1 });

    res.json(bins);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};