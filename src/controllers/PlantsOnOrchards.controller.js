import Model from '#src/database/models/plantOnOrchard.js'
import { CleanFilters, HandleErrorResponse } from '#src/utils/utilsDB.js'
import { Types } from 'mongoose'

const moduleEs = "planta"
const ObjectId  = Types.ObjectId

export async function Get(req, res) {
    try {
        const params = req.query
        let docs = []
        if (params.plant) {
            docs = await Model.find({
                planta: new ObjectId(params.plant)
            }).populate("huerto")
        }
        if (params.huerto) {
            docs = await Model.find({
                huerto: new ObjectId(params.huerto)
            }).populate("planta")
        }
        if (!params.plant && !params.huerto) {
            docs = await Model.find().populate("planta").populate("huerto")
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