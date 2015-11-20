module.exports = function (user, pass) {
  const login = browser.pageObject.login;
  return this
    .setValue(login.user.selector, user)
    .setValue(login.pass.selector, pass)
    .click(login.submit);
};
