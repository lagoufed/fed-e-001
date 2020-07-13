define(['./logger-635770a8'], function (logger) { 'use strict';

  logger.fetchApi('/photos?albumId=1').then(data => {
    data.forEach(item => {
      logger.log(item);
    });
  });

});
