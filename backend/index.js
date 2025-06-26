const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Public files
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/progress', require('./routes/progress'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/ai',  require('./routes/aiRoutes'));
app.use('/api/youtube', require('./routes/youtubeRoutes'));

app.get('/', (req, res) => {
  res.send('EduSynthAI Backend running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
