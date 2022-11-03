const cloudinary = require('cloudinary').v2
import fs from 'fs'

const uploadPropertyImage = async (req, res) => {
    try {
        console.log(req.files, 'files info')
        const result = await cloudinary.uploader.upload(req.files.file.tempFilePath, {
            use_filename: true, folder: 'property-files',
        })
        console.log(result, 'result')
        fs.unlinkSync(req.files.file.tempFilePath)
        const {name} = req.files.file
        const {secure_url} = result
        // const a = {req.files.file.name, result.secure_url}
        return {name, secure_url};
    } catch (error) {
        console.log(error, 'error')
    }

}


export default uploadPropertyImage;