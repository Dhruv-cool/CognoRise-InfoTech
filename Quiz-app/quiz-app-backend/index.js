const express = require('express');
const mongoose = require('mongoose');
const questionRoutes = require('./routes/questionRoutes');
const userRoutes = require('./routes/userRoutes');
const resultRoutes = require('./routes/resultRoutes');
const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb+srv://khandelwaldhruv123:j4eoKI4bpQwLvadu@quiz-app-cluster.zrny8.mongodb.net/?retryWrites=true&w=majority&appName=Quiz-app-cluster', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

app.use(express.json());

// Define your routes here
app.use('/api/questions', questionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/results', resultRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
