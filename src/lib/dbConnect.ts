
import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}


async function dbConnect(): Promise<void> {

    if (connection.isConnected) {

        console.log("already connected");
        console.log(connection.isConnected);

        return;
    }


    try {
        const db = await mongoose.connect(process.env.MONGODB_URI as string || '');

        connection.isConnected = db.connections[0].readyState

        console.log("db connected successfully");
    } catch (error) {

        console.log("database connection failed", error);

        process.exit(1);
    }
}

export default dbConnect;