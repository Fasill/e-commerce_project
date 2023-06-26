import multer from 'multer';
// import '../../publice/images'
export const fileStorageEngine = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'/home/fasil/Desktop/my_cource/socialMid/e-commerce/publice/images')
  },
  filename:(req,file,cb)=>{
    cb(null,Date.now()+'--'+file.originalname)
  }
})

export const upload = multer({storage:fileStorageEngine})