var checker   = require('ember-cli-version-checker');

module.exports = {
  name: 'ember-cli-typescript',

  shouldSetupRegistryInIncluded: function() {
    return !checker.isAbove(this, '0.2.0');
  },

  setupPreprocessorRegistry: function(type, registry) {
    var options = getOptions(this.parent && this.parent.options && this.parent.options['babel']);

    var plugin = {
      name: 'ember-cli-typescript',
      ext: 'ts',
      toTree: function(tree) {
        return require('broccoli-babel-transpiler')(tree, options);
      }
    };

    registry.add('js', plugin);
  },

  included: function(app) {
    this._super.included.apply(this, arguments);

    if (this.shouldSetupRegistryInIncluded()) {
      this.setupPreprocessorRegistry('parent', app.registry);
    }
  }
};

function getOptions(options) {
  options = options || {};
}
