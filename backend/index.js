const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const ExpenseRouter = require('./Routes/ExpenseRouter');
const ensureAuthenticated = require('./Middlewares/Auth');

require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use(bodyParser.json());

// --- CHANGE START ---
// Replace 'https://your-frontend-app.onrender.com' with your ACTUAL Frontend URL
app.use(cors(
    {
        origin: ["https://your-frontend-app.onrender.com"], 
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
));
// --- CHANGE END ---

app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use('/expenses', ensureAuthenticated, ExpenseRouter)


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
