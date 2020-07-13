define(['require'], function (require) { 'use strict';

  // // 导入模块成员
  // import { log } from './logger'
  // import messages from './messages'

  // // 使用模块成员
  // const msg = messages.hi

  // log(msg)

  new Promise(function (resolve, reject) { require(['./logger-6b9e0d75'], resolve, reject) }).then(({ log }) => {
    log('code splitting~');
  });

});
