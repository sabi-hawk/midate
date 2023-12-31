import { Schema, model, InferSchemaType } from "mongoose";


const AddSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    banner: {
        type: String,
    },
    title: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    attachedUrl: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

export type AddType = InferSchemaType<typeof AddSchema>;

const Add = model<AddType>("add", AddSchema);

export default Add;
