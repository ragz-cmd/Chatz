import Message from '../models/messages.model.js'
import Convo from '../models/conversations.model.js'
import { io ,getSocket} from '../socket/socket.js';
import mongoose from 'mongoose';
process.on('uncaughtException', function (err) {
    console.log("Node NOT Exiting...");
  });



export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const senderID = req.user._id;
        const { id: receiverID } = req.params

        let convo = await Convo.findOne({ participants: { $all: [senderID, receiverID] } });

        // Check if conversation exists, if not, create a new one
        if (!convo) {
            convo = await Convo.create({
                participants: [senderID, receiverID],
                messages: [] // Initialize messages array
            });
        }
        
        const newMessage = new Message({
            senderID,
            receiverID,
            message
        });

        // Check if newMessage is successfully created
        if (newMessage) {
            // Ensure convo.messages is initialized as an array
            if (!convo.messages) {
                convo.messages = [];
            }
            // Push the new message ID to convo.messages
            convo.messages.push(newMessage._id);
        }
        
        // Save both conversation and message
        await Promise.all([convo.save(), newMessage.save()]);
        const receiverSocket = getMessages(receiverID)
        if (receiverSocket){
            io.to(receiverSocket).emit("newMessage",newMessage)
        }
        res.status(200).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller", error.message, req.body);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const conversation = await Convo.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

// export const getMessages = async (req, res) => {
//     try {
//         // Perform null checks for req and req.params
//         const receiverID = req && req.params ? req.params.id : null;
//         const senderID = req && req.user ? req.user._id : null;

//         // Check if receiverID is missing
//         if (!receiverID) {
//             return res.status(400).json({ error: "Receiver ID is missing or invalid" });
//         }

//         // Check if senderID is missing
//         if (!senderID) {
//             return res.status(400).json({ error: "Sender ID is missing or invalid" });
//         }

//         // Verify if both sender and receiver IDs are valid ObjectId strings
//         if (!mongoose.Types.ObjectId.isValid(senderID) || !mongoose.Types.ObjectId.isValid(receiverID)) {
//             return res.status(400).json({ error: "Sender ID or Receiver ID is invalid" });
//         }

//         // Find the conversation between sender and receiver
//         const conversation = await Convo.findOne({ participants: { $all: [senderID, receiverID] } }).populate("messages");

//         if (!conversation) {
//             // If conversation is not found, return an empty array
//             return res.status(200).json([]);
//         }

//         // Return the conversation messages
//         return res.status(200).json(conversation.messages);
//     } catch (error) {
//         // Log the error for debugging
//         console.error("Error in getMessages controller:", error);

//         // Return a generic error response to the client
//         return res.status(500).json({ error: "Internal Server Error" });
//     }
// };
