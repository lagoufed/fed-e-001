define(['exports'], function (exports) { 'use strict';

  var fetchApi = endpoint => {
    return fetch(`https://jsonplaceholder.typicode.com${endpoint}`)
      .then(response => response.json())
  };

  const log = msg => {
    console.log('---------- INFO ----------');
    console.log(msg);
    console.log('--------------------------');
  };

  exports.fetchApi = fetchApi;
  exports.log = log;

});
