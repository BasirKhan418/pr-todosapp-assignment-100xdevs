console.log("hello guys")
import express from 'express';
import { CreateTodo,UpdateTodo,DeleteTodo } from './Validation.js';
import Todo from './Schema.js';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());
app.get('/',(req,res)=>{
    res.send("Hello World")
})
app.post('/todo',async(req,res)=>{
    let result = CreateTodo.safeParse(req.body)
    console.log(result.error)
    if(!result.success){
     return res.status(400).send({message:"Invalid Data and Input",data:result.error})
    }
    const data = await Todo.create(req.body);
    res.status(201).send({message:"Todo Created Successfully",data:data,sucess:true})
})
app.get('/todo',async(req,res)=>{
    const data = await Todo.find({});
    res.status(200).send({message:"All Todo find successfully",data:data,sucess:true})
})
app.put('/todo',async(req,res)=>{
    let result  = UpdateTodo.safeParse(req.body);
    if(!result.success){
        console.log(result.error)
        return res.status(400).send({message:"Invalid Data and Input",data:result.error})
    }
    try{
        let data = await Todo.findByIdAndUpdate({_id:req.body.id},{status:req.body.status});
   
        res.send({message:"Todo Updated Successfully",data:data,sucess:true})
    }
    catch(err){
        res.send({message:"No Todo Found",data:err})
    }
    
})
app.delete('/todo',async(req,res)=>{
    let result = DeleteTodo.safeParse(req.body);
    if(!result.success){
        return res.send({message:"Invalid Data and Input",data:result.error})
    }
    try{
        let data = await Todo.findOneAndDelete({_id:req.body.id});
        res.send({message:"Todo Deleted Successfully",data:data,sucess:true})
    }
    catch(err){
        res.status(400).send({message:"No Todo Found",data:err})
    }

})
app.use((err,req,res,next)=>{
    res.status(500).send({message:"Something went wrong or Internal server error",data:err})
    return;
})
app.listen(3000,()=>{
    console.log("server is running on port 3000")
})