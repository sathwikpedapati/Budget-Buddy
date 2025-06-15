const transcationModel = require("../models/transcationModel");
const moment = require("moment");

const getAllTranscations = async (req, res) => {
  try {
    const { frequency, selectedDate, userid, type } = req.body;

    let filter = { userid };

    if (frequency !== "custom") {
      filter.date = {
        $gte: moment().subtract(Number(frequency), "d").startOf("day").toDate(),
      };
    } else if (selectedDate && selectedDate.length === 2) {
      filter.date = {
        $gte: moment(selectedDate[0]).startOf("day").toDate(),
        $lte: moment(selectedDate[1]).endOf("day").toDate(),
      };
    }
    if (type !== "all") {
      filter.type = type; 
    }

    const allTranscations = await transcationModel.find(filter);
    res.status(200).json(allTranscations);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const addTranscations = async (req, res) => {
  try {
    const newTranscation = new transcationModel(req.body);
    await newTranscation.save();
    res.status(200).send("Transaction Created");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const editTranscations = async(req,res)=>{
 try {
  await transcationModel.findOneAndUpdate({_id:req.body.transcationId},req.body.payload);
  res.status(200).send("Edit Successfully")
 } catch (error) {
     console.log(error);
     res.status(500).json(error);
 }

}
const deleteTranscations = async (req, res) => {
  try {
    await transcationModel.findOneAndDelete({ _id: req.body.transcationId });
    res.status(200).send("Transaction Deleted Successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};


module.exports = { getAllTranscations, addTranscations,editTranscations,deleteTranscations };
