const express = require('express');
const multer = require('multer');

console.log(__dirname);

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/files');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});

const upload = multer({ storage: fileStorageEngine });
module.exports = upload;
