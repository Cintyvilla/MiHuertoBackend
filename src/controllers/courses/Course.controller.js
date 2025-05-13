import Model from '#src/database/models/courses/course.model.js'
import topicsCourseModel from '#src/database/models/courses/topicsCourse.model.js'
import { CleanFilters, HandleErrorResponse } from '#src/utils/utilsDB.js'

const moduleEs = "cursos"


export async function Get(req, res) {
    try {
        const params = req.query
        var filter = {}
        if (Object.keys(req.query).length > 0) {
            filter = CleanFilters(params);
            if ('fechaInicio_gte' in filter) {
                const fechaInicio = filter["fechaInicio_gte"]
                delete filter.fechaInicio_gte;
                filter["fechaInicio"] = {
                    $gte: fechaInicio
                }   
            }
        }
        const docs = await Model.find(filter).populate("imagen");
        res.status(200).json(docs);
    } catch (err) {
        HandleErrorResponse(req, res, err, `Error consultando`);
    }
}

export async function GetById(req, res) {
    try {
        const { id } = req.params
        const doc = await Model.findById(id).populate("imagen").lean();
        if (!doc) {
            return res.status(404).json({ message: `No se encontró la ${moduleEs}` });
        }
        const topics = await topicsCourseModel.find({ curso: id }).select({ createdAt: 0, updatedAt: 0, __v: 0 }).lean();
        doc.temas = topics;
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

export async function Update(req, res) {
    try {
        const { id } = req.params
        const doc = await Model.findById(id);
        if (!doc) {
            return res.status(404).json({ message: `No se encontró la ${moduleEs}` });
        }
        Object.assign(doc, req.body);
        const docSaved = await doc.save();
        res.status(200).json(docSaved);
    } catch (err) {
        HandleErrorResponse(req, res, err, `Error actualizando`);
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