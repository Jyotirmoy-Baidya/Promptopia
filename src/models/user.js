import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email Already Exists!'],
        required: [true, 'Email is Required']
    },
    username: {
        type: String,
        required: [true, "Username is required"],
    },
    image: {
        type: String,
    }
})

//The 'models' object is provided by the Mongoose library and stores all the registered models.
//If a model named 'User' already exists in the "Model" object, it asigns that existing model to the 'User' variable
//This prevents redefining the model and ensures that the existing model is reused

//If a model names 'User' does noot exixt in the "Models" object, the 'model' fucntion from mongoose is called t create a new model
//The newly cretaed model is then assigned to the "user" variable

//CONVENTION METHOD
// const User = model('User', UserSchema);

// export default User;

//New 
const User = models.User || model("User", UserSchema);

export default User;