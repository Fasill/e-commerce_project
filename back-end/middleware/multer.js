import multer from 'multer';

export const fileStorageEngine = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'./product_images')
  },
  filename:(req,file,cb)=>{
    cb(null,Date.now()+'--'+file.originalname)
  }
})

export const upload = multer({storage:fileStorageEngine})