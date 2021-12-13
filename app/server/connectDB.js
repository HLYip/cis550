const config = require('./config.json')
const mysql = require('mysql');
const mongoose = require('mongoose');

// TODO: fill in your connection details here
const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('database is connected!')
});

const mongodbUrl = config.mongo_url
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true, useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', () => {
  // eslint-disable-next-line no-console
  console.error.bind(console, 'connection error:');
});

db.once('open', () => {
  // eslint-disable-next-line no-console
  console.log('Connect to Mongodb successfully');
});

const healthSchema = new mongoose.Schema({
    state: {
      type: String,
      required: true,
    },
    county: {
      type: String,
      required: false,
    },
    fips: {
      type: String,
      required: false,
    },
    report_date: {
      type: Date,
      required: false,
    },
    case_count_change: {
      type: Number,
      required: false,
    },
    pos_pct: {
      type: Number,
      required: false,
    },
    trans_level: {
      type: String,
      required: false,
    },
    state_abbr: {
      type: String,
      required: false,
    },
    vacc_pct: {
      type: Number,
      required: false,
    },
    vacc_count: {
      type: Number,
      required: false,
    },
  }, { versionKey: false });
  
const Health = mongoose.model('Health', healthSchema, 'health');

module.exports = {
    connection,
    Health
};