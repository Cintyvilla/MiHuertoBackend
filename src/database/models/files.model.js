import { Schema, model } from "mongoose";
import { GetUrlMedia } from "#src/utils/utilsAttach.js";

const schema = new Schema({
    path: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});

schema.post("find", function(docs) {
    docs.forEach((doc) => {
        if (doc.serverPath && doc.serverPath !== "") {
            doc.url = GetUrlMedia(doc.serverPath);
        }
    });
});

schema.post("findOne", function(doc) {
    if (!doc) return;
    if (doc.serverPath && doc.serverPath !== "") {
        doc.url = GetUrlMedia(doc.serverPath);
    }
});

export default model("Archivos", schema);