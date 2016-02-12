'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createError = exports.createResponse = exports.createMessage = exports.getMessage = exports.isMessageAsPromised = exports.decorateWorker = undefined;

var _nodeUuid = require('node-uuid');

var _MessageTypes = require('./constants/MessageTypes');

var MessageTypes = _interopRequireWildcard(_MessageTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var decorateWorker = function decorateWorker(worker) {

  var hashMap = new Map();
  worker.addEventListener('message', function (_ref) {
    var data = _ref.data;

    var promise = hashMap.get(data.messageHash);
    if (promise) {
      if (data.type === MessageTypes.RESPONSE_AS_PROMISED) {
        promise.resolve(data);
      } else if (data.type === MessageTypes.ERROR_AS_PROMISED) {
        promise.error(data);
      } else {
        console.warn('Unknown message type ' + data.type, data);
      }
      hashMap.delete(data.messageHash);
    }
  });
  worker.sendMessage = function (type, data) {
    return new Promise(function (resolve, error) {
      var messageHash = (0, _nodeUuid.v4)();
      worker.postMessage({
        type: MessageTypes.MESSAGE_AS_PROMISED,
        messageHash: messageHash,
        data: data
      });
      hashMap.set(messageHash, { resolve: resolve, error: error });
    });
  };

  worker.addMessageListener = function (handler) {
    worker.addEventListener('message', function (_ref2) {
      var data = _ref2.data;

      if (data.type === MessageTypes.RESPONSE_AS_PROMISED || data.type === MessageTypes.ERROR_AS_PROMISED) {
        return;
      }
      handler(data);
    });
  };

  return worker;
};

var isMessageAsPromised = function isMessageAsPromised(message) {
  return message.data.type === MessageTypes.MESSAGE_AS_PROMISED;
};

var getMessage = function getMessage(message) {
  var data = message.data;
  return {
    hash: data.messageHash,
    data: data.data
  };
};

var createMessage = function createMessage(message) {
  return {
    type: MessageTypes.MESSAGE_AS_PROMISED,
    messageHash: message.hash,
    data: message.data
  };
};

var createResponse = function createResponse(message) {
  return {
    type: MessageTypes.RESPONSE_AS_PROMISED,
    messageHash: message.hash,
    data: message.data
  };
};

var createError = function createError(message) {
  return {
    type: MessageTypes.ERROR_AS_PROMISED,
    messageHash: message.hash,
    data: message.data
  };
};

exports.decorateWorker = decorateWorker;
exports.isMessageAsPromised = isMessageAsPromised;
exports.getMessage = getMessage;
exports.createMessage = createMessage;
exports.createResponse = createResponse;
exports.createError = createError;