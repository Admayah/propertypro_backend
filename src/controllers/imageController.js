const cloudinary = require('cloudinary').v2
import fs from 'fs'

const uploadPropertyImage = async (req, res) => {
    console.log('image endpoint', req.files)
    // console.log(JSON.parse(req.body.json))
const result = await cloudinary.uploader.upload(req.files.file.tempFilePath, {
    use_filename: true, folder: 'property-files',
})
fs.unlinkSync(req.files.file.tempFilePath)
return result.secure_url;
}


export default uploadPropertyImage;