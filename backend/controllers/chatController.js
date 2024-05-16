import {ChatModel} from '../models/Chat.js'; 


export const getChat = async (req, res) => {
    try {
        const messages = await ChatModel.findAll();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

