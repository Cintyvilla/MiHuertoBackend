import { Schema, model } from "mongoose";

const schema = new Schema({
    nobmre: String,
    descripcion: String,
    duracion: String,
    fecha: Date,
    enlace: String,
    curso: {
        type: Schema.Types.ObjectId,
        ref: "Cursos",
        required: true,
    }
}, {
    timestamps: true,
    versionKey: false,
})

export default model("TemasCursos", schema);