
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/temp')
    },
    filename: function (req, file, cb) {

        cb(null,file.originalname)
  
        console.log(`multer file original name is ${file.originalname}`);
      }
  
    })

    export const upload = multer({ storage, })
