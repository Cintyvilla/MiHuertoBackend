import { Schema, model } from "mongoose";
import { GetUrlMedia } from "#src/utils/utilsAttach.js";

const schema = new Schema({
    nombre: String,
    descripcion: String,
    clima: String,
    riego: String,
    tamaño: String,
    idealPara: [String],
    temporada: String,
    espacio: String,
    propagacion: String,
    ubicacion: String,
    tipo: String,
    imagenes: [{
        type: Schema.Types.ObjectId,
        ref: "Archivos"
    }],
}, {
    timestamps: true,
    versionKey: false,
})


schema.post("find", function(docs) {
    docs.forEach((doc) => {
        if (doc.imagenes && doc.imagenes.length > 0) {
            doc.imagenes = doc.imagenes.map((img) => {
                img.path = GetUrlMedia(img.path);
                return img;
            });
        }
    });
});

schema.post("findOne", function(doc) {
    if (!doc) return;
    if (doc.imagenes && doc.imagenes.length > 0) {
        doc.imagenes = doc.imagenes.map((img) => {
            img.path = GetUrlMedia(img.path);
            return img;
        });
    }
});

export default model("Plantas", schema);