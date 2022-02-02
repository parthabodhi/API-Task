const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  tag: {
    type: String,
  },
  Date: {
    type: String,
  },
  Mode: {
    type: String,
  },
  Location: {
    type: String,
  },
  Customer: {
    type: String,
  },
  Product_Code: {
    type: String,
  },
  Source: {
    type: String,
  },
  RailCar: {
    type: String,
  },
  Fleet: {
    type: String,
  },
  SubFleet: {
    type: String,
  },
  RailCar_Seals: {
    type: String,
  },
  Bol: {
    type: String,
  },
  Terminal_Destination: {
    type: String,
  },
  City: {
    type: String,
  },
  State: {
    type: String,
  },
  Weight: {
    type: Number,
  },
  Temperature: {
    type: Number,
  },
  Density: {
    type: Number,
  },
  S_W_Percent: {
    type: Number,
  },
  S_W_BBL: {
    type: Number,
  },
  Net_Oil_BBL: {
    type: Number,
  },
  Total_Vol_BBL: {
    type: Number,
  },
  S_W_M3: {
    type: Number,
  },
  Net_Oil_M3: {
    type: Number,
  },
  Total_Vol: {
    type: Number,
  },
  Bol_Date: {
    type: String,
  },
  Heel_Vol: {
    type: Number,
  },
  Heel_Weight: {
    type: Number,
  },
});

module.exports = mongoose.model('sheetdata', Schema, 'sheetdata');
