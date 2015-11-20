import regex from './../vars/regex.js';
import sample from './../vars/sample.js';

module.exports = {
  user: {
    selector: '#login_user',
    sample: sample.email,
    regex: regex.email
  },
  pass: {
    selector: '#login_pass',
    sample: sample.password,
    regex: regex.password
  },
  submit: {
    selector: '#login_submit'
  }
};
