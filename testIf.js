/* eslint-disable func-names */
const absolute = function (number) {
  if (number >= 0) return number;
  //   if (number < 0) return -number;
  //   return 0;
  return -number;
};
module.exports = absolute;
