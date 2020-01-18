const handlebars = require('handlebars')

const Register = {
  init: () => {
    Register.initEqual()
  },

  /**
   * 注册 equal 动作
   */
  initEqual: () => {
    handlebars.registerHelper('equal', function(v1, v2, options) {
      if(v1 === v2) {
        return options.fn(this);
      }
      return options.inverse(this);
    });
  }
}

module.exports = Register
