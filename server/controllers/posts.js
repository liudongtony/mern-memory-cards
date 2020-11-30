import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
    try{
        const posts = await PostMessage.find();
        res.status(200).json(posts);
    } catch(err) {
        res.status(404).json({message: err.message})
    }
}

export const createPost = async (req, res) => {
    const newPost = new PostMessage(req.body);
    try{
        await newPost.save();
        res.status(201).json(newPost);
    } catch(err) {
        res.status(409).json({message: err.message})
    }
}

export const updatePost = async (req, res) => {
    const {id} = req.params;
    const post = req.body;
    try{
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID') ;
        const updatedPost = await PostMessage.findByIdAndUpdate(id, {...post, _id:id}, {new: true});
        res.status(200).json(updatePost);
    } catch(err) {
        res.status(409).json({message: err.message})
    }
}

export const deletePost = async (req, res) => {
    const {id} = req.params;
    try{
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID') ;
        await PostMessage.findByIdAndDelete(id);
        res.status(200).json({message: 'Post is deleted.'});
    } catch(err) {
        res.status(409).json({message: err.message})
    }
}

export const likePost = async (req, res) => {
    const {id} = req.params;
    try{
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID') ;
        const post = await PostMessage.findById(id);
        console.log('------- getPostById')
        console.log(post)
        const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
        res.status(200).json(updatedPost);
    } catch(err) {
        res.status(409).json({message: err.message})
    }
}