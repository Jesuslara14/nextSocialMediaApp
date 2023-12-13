import mongoose from "mongoose"

export default async function connect (){
    try{
        const db = mongoose.connect(process.env.MONGO_URI);
        return({ db });
    } catch (error) {
        console.log(`ERROR CONNECTING TO DATABASE: ${error}`);
    }
}
