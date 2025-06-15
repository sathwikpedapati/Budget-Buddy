const express = require("express");
const { addTranscations, getAllTranscations,editTranscations,deleteTranscations } = require("../controllers/transcationController");
const router = express.Router();
router.post("/add-transcations",addTranscations)
router.post("/edit-transcations",editTranscations)
router.post("/get-transcations",getAllTranscations);
router.post("/delete-transcations",deleteTranscations)
module.exports= router;
