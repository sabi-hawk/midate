import { Schema, model, InferSchemaType } from "mongoose";


const StorySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    type: {
        type: String,
        default: "public",
        enum: ["public", "private"]
    },
    content: {
        type: String,
        default: ''
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
    ],
    disLikes: [
        {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
    ],
    reactions: [
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            reaction: {
                type: String,
            },
        }
    ],
    comments: [
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            userName: {
                type: String,
                default: ''
            },
            userProfilePic: {
                type: String,
                default:''
            },
            content: {
                type: String,
                default: ''
            },
            createdAt: {
                type: Date,
                default: Date.now
            },
        }
    ],
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

export type StoryType = InferSchemaType<typeof StorySchema>;

const Story = model<StoryType>("story", StorySchema);

export default Story;
