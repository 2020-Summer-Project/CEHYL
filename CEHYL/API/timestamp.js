import moment from 'moment';

export function getCurrentTimestamp() {
  var timestamp = moment().format('DD-MM-YYYY HH:mm:ss');
  return timestamp;
}
