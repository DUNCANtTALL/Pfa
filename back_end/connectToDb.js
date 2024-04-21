async function connectToMongoDB() {
    const uri = 'mongodb+srv://Farhan01:tZ7CmdEnYSpcbmyU@cluster0.mhyww5n.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0';
    
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log('Connected to MongoDB');

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}
