
import express from 'express'
import crypto from 'crypto';




const app = express();


app.get('/', (req, res) => {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
        res.send('sameeer');
    })

});
app.get('/fast', (req, res) => {

    res.send('sameeer');
});

app.listen(3000);
