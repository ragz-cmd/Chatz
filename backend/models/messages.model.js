import mongoose from "mongoose";

const messageSchema  = new mongoose.Schema({
    senderID : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required : true
    },
    receiverID : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required : true
    },
    message : {
        type :  String,
        required : true
    }
},{timestamps: true})

const Message = mongoose.model('messages',messageSchema)
export default Message