import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { GetUrlMedia } from "#src/utils/utilsAttach.js";

const userSchema = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
            "El correo electrónico no es válido",
        ],
    },
    celular: String,
    password: {
        type: String,
        required: true,
        select: false,
    },
    foto: {
        type: Schema.Types.ObjectId,
        ref: "Archivos"
    }
}, {
    timestamps: true,
    versionKey: false,
});


userSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.password);
};

userSchema.pre("save", function(next) {
    if (!this.isModified("password")) return next();
    try {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) return next(err);
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) return next(err);
                this.password = hash;
                next();
            });
        });
    } catch (error) {
        next(error);
    }
});


userSchema.post("find", function(docs) {
    docs.forEach((doc) => {
        if (doc.foto && doc.foto !== "") {
            doc.foto.path = GetUrlMedia(doc.foto.path);
        }
    });
});

userSchema.post("findOne", function(doc) {
    if (!doc) return;
    if (doc.foto && doc.foto !== "") {
        doc.foto.path = GetUrlMedia(doc.foto.path);
    }
});

export default model("Usuarios", userSchema);