const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

const db = require('./database');

const port = process.env.PORT || 3000;
app.listen(port, () => {
    db.query('select 1+1 from dual', (err, res) => {
        if(err) throw err;
        console.log('Database connected successfully');
    })
    console.log(`App running on port ${port}...`);
});