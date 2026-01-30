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

// --- CRITICAL FIX HERE ---
app.use(cors(
    {
        // THIS MUST MATCH YOUR FRONTEND URL EXACTLY
        origin: ["https://expanse-tracker-xzco.onrender.com"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
));
// -------------------------

app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use('/expenses', ensureAuthenticated, ExpenseRouter)


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
