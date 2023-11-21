import mongoose from "mongoose";


const connectDB = async() =>{

    try{
        const {connection} = await mongoose.connect('mongodb://127.0.0.1:27017/masterApp')
        // const {connection} = await mongoose.connect('mongodb+srv://realllraja0:PJfrderdIKFIBevQ@cluster0.qxoyqkr.mongodb.net/');
        console.log("MongoDB Connected",connection.host)
    }catch(err){
        console.log('error=>',err)
    }
}

export default connectDB;