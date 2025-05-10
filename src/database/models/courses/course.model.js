import { Schema, model } from "mongoose";
import { GetUrlMedia } from "#src/utils/utilsAttach.js";

const schema = new Schema({
    nombre: String,
    duracion: String,
    modalidad: String,
    descripcion: String,
    fechaInicio: {
        type: Date,
        required: true,
    },
    fechaFin: {
        type: Date,
        required: true,
    },
    imagen: {
        type: Schema.Types.ObjectId,
        ref: "Archivos"
    },
    direccion: String,
}, {
    timestamps: true,
    versionKey: false,
})


schema.post("find", function (docs) {
    docs.forEach((doc) => {
        if (doc.imagen && doc.imagen !== "") {
            doc.imagen.path = GetUrlMedia(doc.imagen.path);
        }
    });
});

schema.post("findOne", async function (doc) {
    if (!doc) return;
    if (doc.imagen && doc.imagen !== "") {
        doc.imagen.path = GetUrlMedia(doc.imagen.path);
    }
});

export default model("Cursos", schema);