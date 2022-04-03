const moment = require("moment");

const isDate = (value) => value && moment(value).isValid();

module.exports = isDate;