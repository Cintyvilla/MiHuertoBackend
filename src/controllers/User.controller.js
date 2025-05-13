import Model from '#src/database/models/user.model.js'
import { createUniqueFileName } from '#src/utils/utilsAttach.js'
import { CleanFilters, HandleErrorResponse } from '#src/utils/utilsDB.js'
import { __dirname, __dirUploads } from '#src/utils/utilsAttach.js'

const moduleEs = "usuario"


export async function Get(req, res) {
    try {
        const params = req.query
        var filter = {}
        if (Object.keys(req.query).length > 0) {
            filter = CleanFilters(params);
        }
        const docs = await Model.find(filter).populate("foto");
        res.status(200).json(docs);
    } catch (err) {
        HandleErrorResponse(req, res, err, `Error consultando`);
    }
}

export async function GetById(req, res) {
    try {
        const { id } = req.params
        const doc = await Model.findById(id).populate("foto");
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
        req.body.foto = undefined
        const doc = new Model(req.body);
        const docSaved = await doc.save()
        const response = docSaved.toObject();
        delete response.password;
        res.status(200).json(response);
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
        delete req.body.password
        Object.assign(doc, req.body);
        const docSaved = await doc.save();
        res.status(200).json(docSaved);
    } catch (err) {
        HandleErrorResponse(req, res, err, `Error Actualizando`);
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

export async function Login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email y contraseña son requeridos" });
        }
        const user = await Model.findOne({ email }).populate("foto").select("+password");
        if (!user) {
            return res.status(404).json({ message: "Usuario o Contraseña incorrecta" });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Usuario o Contraseña incorrecta" });
        }
        res.status(200).json({ message: "Login exitoso", user });
    } catch (err) {
        HandleErrorResponse(req, res, err, `Error en el proceso de login`);
    }
}

export async function UpdatePassword(req, res) {
    try {
        const { id } = req.params;
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ message: "La contraseña es requerida" });
        }

        const user = await Model.findById(id);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        user.password = password;
        await user.save();

        res.status(200).json({ message: "Contraseña actualizada exitosamente" });
    } catch (err) {
        HandleErrorResponse(req, res, err, `Error actualizando la contraseña`);
    }
}
