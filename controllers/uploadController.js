const path = require('path');

const reader = require('xlsx');

const mongoose = require('mongoose');

const fs = require('fs');

const { google } = require('googleapis');

const multer = require('multer');

const { timeStamp } = require('console');

const data = require('../models/Model');

mongoose.connect(process.env.DB).then((con) => {
  console.log(con.connections);
  console.log('DB connection successful.....');
});

const CLIENT_ID = '398639869978-8shiinuppjuiioutd69qhuj74l4gplqb.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04yXBHq4RuQ0LCgYIARAAGAQSNgF-L9IreLsX54XK-euMR1GVrUqX6PSYPTAoymLrQZ5hG4fnImhWyUXXIKyqII-048kIIybVQg';

const oauth2client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
);

oauth2client.setCredentials({ refresh_token: REFRESH_TOKEN });

const uploader = async (req, res, next) => {
  console.log(req.file.filename);

  // let data = []
  const dirname = path.join('E:/SoluLab/API Task', '/public/files', req.file.filename);
  const file = await reader.readFile(dirname);
  // console.log(file);
  const sheets = file.SheetNames;

  for (let i = 0; i < sheets.length; i++) {
    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
    temp.forEach(async (result) => {
      const vAssign = {
        Tag: file.SheetNames[i],
        Date: result.DATE,
        Mode: result.MODE,
        Location: result.LOCATION,
        Customer: result.CUSTOMER,
        Product_Code: result['PRODUCT CODE'],
        Source: result.SOURCE,
        RailCar: result.RAILCAR,
        Fleet: result.FLEET,
        SubFleet: result.SUBFLEET,
        RailCar_Seals: result["'RAILCAR SEALS"],
        Bol: result.BOL,
        Terminal_Destination: result['TERMINAL / DESTINATION'],
        City: result.CITY,
        State: result.STATE,
        Weight: result['WEIGHT\r\n(kg)'],
        Temperature: result['TEMPERATURE\n(C)'],
        Density: result['DENSITY\n(kg/m3 @ 15C)'],
        S_W_Percent: result['S&W %'],
        S_W_BBL: result['S&W\n(BBL @ 15C)'],
        Net_Oil_BBL: result['NET OIL\n(BBL @ 15C)'],
        Total_Vol_BBL: result['TOTAL VOL\n(BBL @ 15C)'],
        S_W_M3: result['S&W\n(m3 @ 15C)'],
        Net_Oil_M3: result['NET OIL\n(m3 @ 15C)'],
        Total_Vol: result['TOTAL VOL\n(m3 @ 15C)'],
        Bol_Date: result['BOL DATE'],
        Heel_Vol: result['HEEL VOLUME\n(m3 @ 15C)'],
        Heel_Weight: result['HEEL WEIGHT\n(kg)'],
      };
      const update = await new data(vAssign).save();
    });
  }
  const filePath = path.join('E:/SoluLab/API Task', '/public/files', req.file.filename);
  console.log(filePath);
  const drive = google.drive({
    version: 'v3',
    auth: oauth2client,
  });
  try {
    const response = await drive.files.create({
      requestBody: {
        name: req.file.filename,
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
      media: {
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        body: fs.createReadStream(filePath),
      },
    });
    console.log(response);
  } catch (err) {
    console.log('Cannot upload the file', err.message);
  }
  
  res.end();
};

module.exports = { uploader };
