import { Schema, model } from "mongoose";

const schema = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    direccion: {
        type: String,
        required: true,
    },
    descripcion: String,
    horario: String,
    telefono: String,
    latitud: Number,
    longitud: Number,
    encargado: String,
    tamano: String,
}, {
    timestamps: true,
    versionKey: false,
});


export default model("Huertos", schema);