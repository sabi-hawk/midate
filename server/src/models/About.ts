import { Schema, model, InferSchemaType } from "mongoose";


const AboutSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'user'
    },
    description: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    country: {
        type: String,
    },
    height: {
        type: Number,
    },
    weight: {
        type: Number,
    },
    bodyMark: {
        type: String,
        default: 'none',
        enum: ['none', 'Piercing', 'Tattoos', 'Freckles']
    },
    relationships: {
        type: Number,
        default: '0',
    },
    children: {
        type: Number,
        default: '0',
    },
    images: [{
        type: String,
    }],
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

export type AboutType = InferSchemaType<typeof AboutSchema>;

const About = model<AboutType>("about", AboutSchema);

export default About;
