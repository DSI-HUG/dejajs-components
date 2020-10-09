'use strict';

module.exports = function BadLicenseError(message, extra) {
    this.name = this.constructor.name;
    this.message = `${'\n' + '\u001b[31m\t'}${extra.join('\n\t')}\u001b[39m`;
    // eslint-disable-next-line no-unused-expressions
    Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
};

require('util').inherits(module.exports, Error);
