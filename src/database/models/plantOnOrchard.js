import { Schema, model } from "mongoose";

const schema = new Schema({
    planta: {
        type: Schema.Types.ObjectId,
        ref: "Plantas",
        required: true,
    },
    huerto: {
        type: Schema.Types.ObjectId,
        ref: "Huertos",
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
})

schema.index({ planta: 1, huerto: 1 }, { unique: true });

export default model("PlantasEnHuertos", schema);