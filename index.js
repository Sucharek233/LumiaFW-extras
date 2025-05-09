import express from 'express';
import cors from 'cors';
import 'dotenv/config';
const app = express();

import apiRoutes from './src/routes/testing.js';
import adminRoutes from './src/routes/admin.js';

const port = 80;

app.use((req, res, next) => {
    const start = Date.now(); // Capture request start time
    res.on('finish', () => {  // Fires when response is completed
        const duration = Date.now() - start;
        console.log(`[${new Date().toISOString()}] ${req.ip} ${req.method} ${req.url} - ${duration}ms`);
    });
    
    next();
});

app.get('/', (req, res) => {
    res.send("Why hello there");
});

// app.use(express.json());
app.use(cors());
app.use(express.json());

app.use('/api/admin', adminRoutes);
app.use('/api', apiRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

process.on('uncaughtException', function(err) {
    const message = err.stack.toString();
    const logError = String(`\n${getTime()} ERROR>\n${message}\n\n`);
    console.log(logError);
    
    appendFileSync("./log", logError);
});