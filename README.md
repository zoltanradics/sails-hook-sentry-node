# sails-hook-sentry

[Sails JS](http://sailsjs.org) hook to log errors and stack traces in [Sentry](https://github.com/getsentry/sentry) from within your Sails.js applications.

## Installation

`npm install sails-hook-sentry-node`

### Usage

* requires at least sails >= 0.11*

### Configuration

By default, configuration lives in `sails.config.sentry`.  The configuration key (`sentry`) can be changed by setting `sails.config.hooks['sails-hook-sentry'].configKey`.

#### Example

```javascript
// [your-sails-app]/config/sentry.js
module.exports.sentry = {
  active: true,
  dsn: "{{ DSN }}",
  options: {
    logger: 'default',
    release: '1.0.0',
    environment: 'staging'
  }
};
```
