import mongoose from "mongoose";


const convoSchema = mongoose.Schema({
    participants :[ {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users"
    },],
    messages : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "messages",
        default : []
    },]

},{timestamps : true})

const convo = mongoose.model('conversations',convoSchema)

export default convo