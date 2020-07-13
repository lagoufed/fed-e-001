define(['./logger-635770a8'], function (logger) { 'use strict';

  logger.fetchApi('/posts').then(data => {
    data.forEach(item => {
      logger.log(item);
    });
  });

});
