import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODBURI || '';

if (!MONGODB_URI) {
    console.log(MONGODB_URI);
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

/**
 * Global is used here to maintain a cached connection across hot reloads in development
 * to prevent multiple connections
 */

let cached = (global).mongoose;

if(!cached){
    cached = (global).mongoose = { conn: null, promise: null};
}

async function connect(){
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default connect;