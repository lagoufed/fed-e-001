define(['exports'], function (exports) { 'use strict';

  const log = msg => {
    console.log('---------- INFO ----------');
    console.log(msg);
    console.log('--------------------------');
  };

  const error = msg => {
    console.error('---------- ERROR ----------');
    console.error(msg);
    console.error('---------------------------');
  };

  exports.error = error;
  exports.log = log;

});
