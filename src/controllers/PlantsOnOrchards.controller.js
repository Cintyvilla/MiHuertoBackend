import Model from '#src/database/models/plantOnOrchard.js'
import { CleanFilters, HandleErrorResponse } from '#src/utils/utilsDB.js'

const moduleEs = "planta"


export async function Get(req, res) {
    try {
        const params = req.query
        let docs = []
        if (params.plant) {
            docs = await (await Model.populate("huerto")).select("-planta").find({planta: params.plant})
        }
        if (params.huerto) {
            docs = await (await Model.populate("planta")).select("-huerto").find({huerto: params.huerto})
        }
        if (!params.plant && !params.huerto) {
            docs = await Model.find().populate("planta").populate("huerto")
        }
        if (docs.length == 0) {
            return res.status(404).json({ message: `No se encontró ninguna ${moduleEs}` });
        }
        res.status(200).json(docs);
    } catch (err) {
        HandleErrorResponse(req, res, err, `Error consultando`);
    }
}

export async function GetById(req, res) {
    try {
        const { id } = req.params
        const doc = await Model.findById(id).populate("planta").populate("huerto");
        if (!doc) {
            return res.status(404).json({ message: `No se encontró la ${moduleEs}` });
        }
        res.status(200).json(doc);
    } catch (err) {
        HandleErrorResponse(req, res, err, `Error consultando`);
    }
}

export async function Insert(req, res) {
    try {
        const doc = new Model(req.body);
        const docSaved = await doc.save()
        res.status(200).json(docSaved);
    } catch (err) {
        HandleErrorResponse(req, res, err, `Error guardando`);
    }
}

export async function Delete(req, res) {
    try {
        const { id } = req.params
        const result = await Model.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: `No se encontró la ${moduleEs}` });
        }
        res.status(200).json({ message: `${moduleEs} eliminada` });
    } catch (err) {
        HandleErrorResponse(req, res, err, `Error eliminando`);
    }
}