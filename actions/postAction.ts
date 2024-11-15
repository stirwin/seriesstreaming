'use server';
import PostModel from '../lib/postModel';
import connectDB from '../lib/db';


export async function getPosts() {
    try {
        await connectDB();
        const data = await PostModel.find();

        return data;
    } catch (error) {
        console.error(error);
    }
}
