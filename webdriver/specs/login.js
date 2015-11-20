describe('example', function () {
  before((done) => browser.url('/', done));

  it('tests a feature', function () {
    return browser
      .end();
  });

});
