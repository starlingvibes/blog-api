const util = require('util');
const Multer = require('multer');
const maxSize = 40 * 1024 * 1024;

let processFile = Multer({
  storage: Multer.memoryStorage(),
  limits: { fileSize: maxSize },
}).single('profileImage');

let processFileMiddleware = util.promisify(processFile);
module.exports = processFileMiddleware;
