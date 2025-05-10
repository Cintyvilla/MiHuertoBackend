import { HandleErrorResponse } from '#src/utils/utilsDB.js'
import Model from "#src/database/models/files.model.js"
import { createUniqueFileName } from "#src/utils/utilsAttach.js"
import { __dirname, __dirUploads } from "#src/utils/utilsAttach.js"

export async function UploadImage(req, res) {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: "No se subieron archivos" });
        }

        const { images } = req.files;
        if (!images) {
            return res.status(400).json({ message: "La imagen es requerida" });
        }

        if (Array.isArray(images)) {
            for (const key in images) {
                if (!images[key].mimetype.startsWith("image/")) {
                    return res.status(400).json({ message: "El archivo debe ser una imagen" });
                }
            }
        }else{
            if (!images.mimetype.startsWith("image/")) {
                return res.status(400).json({ message: "El archivo debe ser una imagen" });
            }
        }

        let results = []
        if (Array.isArray(images)) {
            for (const key in images) {
                const doc = await uploadImage(images[key])
                results.push(doc)
            }
        }else{
            const doc = await uploadImage(images)
            results.push(doc)
        }

        res.status(200).json(results);
    } catch (err) {
        HandleErrorResponse(req, res, err, `Error subiendo la imagen`);
    }
}

async function uploadImage(image){
    if (!image.mimetype.startsWith("image/")) {
        return res.status(400).json({ message: "El archivo debe ser una imagen" });
    }

    const path =  __dirUploads + "/" + createUniqueFileName(image.name);
    await image.mv(__dirname + path);

    const doc = new Model({
        path: path,
    })
    const docSaved = await doc.save();
    return docSaved;
}