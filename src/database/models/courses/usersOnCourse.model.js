import { Schema, model } from "mongoose";
import TopicCourse from "#src/database/models/courses/topicsCourse.model.js";

const userOnCourseSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "Usuarios",
        immutable:true,
    },
    curso: {
        type: Schema.Types.ObjectId,
        ref: "Cursos",
        immutable:true,
    },
    progresoTemas: [{
        type: Schema.Types.ObjectId,
        ref: "TemasCursos"
    }],
}, {
    timestamps: true,
    versionKey: false,
})

userOnCourseSchema.index({ usuario: 1, curso: 1 }, { unique: true });

export default model("UsuariosCursos", userOnCourseSchema);