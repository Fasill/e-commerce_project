import multer from 'multer';
// import '../../publice/images'
export const fileStorageEngine = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'/home/fasil/Desktop/my_cource/socialMid/e-commerce/front-end/public/images')
  },
  filename:(req,file,cb)=>{
    cb(null,Date.now()+'--'+file.originalname)
  }
})

export const upload = multer({storage:fileStorageEngine})