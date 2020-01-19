const handlebars = require('handlebars')

const Register = {
  init: () => {
    Register.initEqual()
    Register.initUnEqual()
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
  },

  /**
   * 注册 unEqual 动作
   */
  initUnEqual: () => {
    handlebars.registerHelper('unEqual', function(v1, v2, options) {
      if(v1 === v2) {
        return options.inverse(this);
      }
      return options.fn(this);
    });
  }
}

module.exports = Register
