const Sentry = require('@sentry/node');

module.exports = function(sails) {
  return {

    /**
     * Default configuration
     *
     * We do this in a function since the configuration key for
     * the hook is itself configurable, so we can't just return
     * an object.
     */
    defaults: {
      __configKey__: {
        // Set autoreload to be active by default
        active: true,
        dsn: null,
        options: {}
      }
    },

    /**
     * Initialize the hook
     * @param  {Function} cb Callback for when we're done initializing
     * @return {Function} cb Callback for when we're done initializing
     */
    initialize: function(cb) {
      var settings = sails.config[this.configKey];
      if (!settings.active) {
        sails.log.verbose('Autoreload hook deactivated.');
        return cb();
      }

      if (!settings.dsn) {
        sails.log.verbose('DSN for Sentry is required.');
        return cb();
      }

      Sentry.init({ dsn: settings.dsn });
      sails.sentry = Sentry;

      // handles Bluebird's promises unhandled rejections
      process.on('unhandledRejection', function(reason) {
        console.error('Unhandled rejection:', reason);
        Sentry.captureException(reason);
      });

      // We're done initializing.
      return cb();
    }
  };
};
