import { Schema, model, models } from 'mongoose';

const postSchema = new Schema({
    msg:{
        type: String,
        required: true
    }
}, {timestamps: true});

const PostModel = models.series || model('series', postSchema);

export default PostModel;