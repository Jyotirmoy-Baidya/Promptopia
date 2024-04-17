import mongoose from "mongoose";

let isConnected = false // Track the connection status

const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log("MongoDb ALready connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'share_prompt',
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        isConnected = true;

        console.log("MongoDB Connected");
    } catch (error) {
        console.log(error);
    }
}

export default connectToDB