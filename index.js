var checker   = require('ember-cli-version-checker');

/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-typescript',
  shouldSetupRegistryInIncluded: function() {
    return !checker.isAbove(this, '0.2.0');
  },

  setupPreprocessorRegistry: function(type, registry) {
    var options = this.parent && this.parent.options || {};
    console.log('test');
    var plugin = {
      name: 'ember-cli-typescript',
      ext: 'ts',
      toTree: function(tree) {
        return require('broccoli-typescript')(tree, options);
      }
    };

    registry.add('ts', plugin);
  },

  included: function(app) {
    this._super.included.apply(this, arguments);

    //if (this.shouldSetupRegistryInIncluded()) {
      this.setupPreprocessorRegistry('parent', app.registry);
    //}
  }
};
