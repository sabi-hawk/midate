import { Schema, model, InferSchemaType } from "mongoose";


const NotificationSchema = new Schema({
    senderId: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'user'
    },
    receiverId: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'user'
    },
    content: {
        type: String,
    },
    type: {
        type: String,
        default: 'confirmation',
        enum: ['chat', 'confirmation']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

export type NotificationType = InferSchemaType<typeof NotificationSchema>;

const Notification = model<NotificationType>("notification", NotificationSchema);

export default Notification;
