// const multer = require("multer");

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {

//         cb(null, "uploads/");
//     },
//     filename: function (req, file, cb) {
//         cb(null, req.user_id);
//     }
// });

// const upload = multer({ storage: storage });

// module.exports = upload;

const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;
