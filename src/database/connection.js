import { connect } from "mongoose";

// Connection options
const options = {
  maxPoolSize: 10, // Maximum number of connections in the pool
  minPoolSize: 2, // Minimum number of connections to keep in the pool
  maxIdleTimeMS: 30000, // Close idle connections after 30 seconds
  waitQueueTimeoutMS: 5000, // Wait up to 5 seconds for a connection
  dbName: "MiHuertoApp"
};


const connectDb = () => {
  // Connect to MongoDB
  const connectionString = process.env.ATLAS_URI || "";
  connect(connectionString, options)
    .then(() => console.log('Connected to MongoDB with connection pooling'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));
}

export default connectDb