



// //*so basically what cluster allows us to do is like making the copying of the node it's like we're runing the node but as the multi-threade


// //*first time the node runn the file will invokde the cluster manager and then it'll run again that file  and will start runing the worker file and then again and then again,so the way this will work is having multiple thread runing

// //*first it runs the cluster manager copy of the node


import cluster from 'cluster';
import express from 'express'
import crypto from 'crypto';



if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);


    cluster.fork();

    cluster.fork();


    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    })


} else {

    console.log('children');
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
}

// import express from "express";
// import os from 'os';
// import cluster from 'cluster';
// const port = 3000;
// const app = express();


// const cores = os.cpus().length;
// console.log(cores);

// if (cluster.isPrimary) {
//     console.log(`Primary ${process.pid} is running`);

//     for (let i = 0; i < cores; i++) {
//     cluster.fork();
//     cluster.on('exit', (worker, code, signal) => {
//         console.log(`worker ${worker.process.pid} died`);
//     })
//     }



// }
// else {
// app.get("/heavy", (req, res) => {
//     let total = 0;
//     for (let i = 0; i < 5_000_000; i++) {
//         total++;
//     }
//     res.send(`The result of the CPU intensive task is ${total}\n`);
// });

// app.listen(port, () => {
//     console.log(`App listening on port ${port}`);
// });

// }

//*so they way these work is we're basically creating the four processes and as we know that we have the one thread for the single process so now we'll have the four threads that are serving our application


//*best for the large site so we can have the multiple instacnes of the server



//*one thing to be noticed that thread pool doesn't relate to our cluster means that if we say that that the thread_pool size is 1 then it'll affect the ability to so that we can have multiple instances on same node server



//!to enchance the performance we can first increase the thread pool size ad the second thing is that we can also use the clustering or the last thing is that we can even use the workers package to create to more instacnes


//*when we say set the thread pool with the cluster means that every child have that number of theads in the thread pool

//*If we make the too many node instances rather then according to the your system cores then it more instances eventaully will end up in the more slow and why is that because then our os will juggle between these task since os will not able to focus completely on one so it'll not complete the one and will try to complete another like jump from one another



//*why is that happened is because of the computer or the laptop limits in my case i had 4 cores machines which means that i've four cpus but at the same time i'm creating the 6 node instances, so what happened is my cpu had 6 work to do so it didn't complete one and then moved to another, instead it jump between these programs because they had same priority now priority is something we'll not talk about since it's truel related to low level os task,we'll bouncing between these task or our cpu so the sugesstion i'd give you is to make the instead



//!or make the two fork or max 3 processes


//!the way the logical cores are got to know that like how many cores does the cp has like 3 and obvs if it has two cores physcially then it can perfrom the two threads that means 4 logical cores