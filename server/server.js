const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const cors = require('cors');
//const bcrypt = require('bcrypt');

const app = express();
const PORT = 4000;

app.use(bodyParser.json());

const corsOptions = {
    origin: '*',
};

app.use(cors(corsOptions));

let patients;
let doctors;
let management;

async function connect() {
    try {
        const client = await MongoClient.connect(
            "mongodb+srv://mchs109872001:Cherry@cluster0.bp4gady.mongodb.net/?retryWrites=true&w=majority",
        );
        const myDB = client.db("HMS");
        patients = myDB.collection("patients");
        doctors = myDB.collection("doctors");
        management = myDB.collection("management");
        console.log("Connected to the database");
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
}

connect().then()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.post('/patientSignup', async (req, res) => {
    try {
        console.log(req.body);

        // Check if the user with the given username already exists
        const existingUser = await patients.findOne({ username: req.body.username });

        if (existingUser) {
            // User with the same username already exists
            res.status(409).send('User already exists');
            return;
        }

        // If the user does not exist, add to the database
        const result = await patients.insertOne({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
        });
        console.log(result)
        if (result.acknowledged) {

            res.send('Added successfully');
        } else {
            res.status(500).send('Failed to add user');
        }
    } catch (error) {
        console.error('Error in /patientSignup route:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/doctorSignup', async (req, res) => {
    try {
        console.log(req.body);

        // Check if the user with the given username already exists
        const newUser = await doctors.findOne({ username: req.body.username });

        if (newUser) {
            // User with the same username already exists
            res.status(409).send('User already exists');
            return;
        }

        // If the user does not exist, add to the database
        const result = await doctors.insertOne({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
        });
        console.log(result)
        if (result.acknowledged) {

            res.send('Added successfully');
        } else {
            res.status(500).send('Failed to add user');
        }
    } catch (error) {
        console.error('Error in /doctorSignup route:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/managementSignup', async (req, res) => {
    try {
        console.log(req.body);

        // Check if the user with the given username already exists
        const alreadyUser = await management.findOne({ username: req.body.username });

        if (alreadyUser) {
            // User with the same username already exists
            res.status(409).send('User already exists');
            return;
        }

        // If the user does not exist, add to the database
        const result = await management.insertOne({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
        });
        console.log(result)
        if (result.acknowledged) {

            res.send('Added successfully');
        } else {
            res.status(500).send('Failed to add user');
        }
    } catch (error) {
        console.error('Error in /managementSignup route:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/patientLogin', async (req, res) => {
    try {
        const existingUser = await patients.findOne({ username: req.body.username });

        if (existingUser) {

            if (existingUser.password === req.body.password) {

                res.status(200).send('you are ready to login');
            } else {

                res.status(401).send('Incorrect password');
            }
        } else {
            res.status(404).send("User doesn't exist");
        }
    } catch (e) {
        console.error('Login failed:', e);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/doctorLogin', async (req, res) => {
    try {
        const existingUser = await doctors.findOne({ username: req.body.username });

        if (existingUser) {

            if (existingUser.password === req.body.password) {
                res.status(200).send('you are ready to login');
            } else {
                res.status(401).send('Incorrect password');
            }
        } else {
            res.status(404).send("User doesn't exist");
        }
    } catch (e) {
        console.error('Login failed:', e);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/managementLogin', async (req, res) => {
    try {
        const existingUser = await management.findOne({ username: req.body.username });

        if (existingUser) {
            // Assuming plain text passwords (not recommended, use bcrypt for hashing)
            if (existingUser.password === req.body.password) {
                // Passwords match, allow login
                res.status(200).send('you are ready to login');
            } else {
                // Incorrect password
                res.status(401).send('Incorrect password');
            }
        } else {
            // User doesn't exist
            res.status(404).send("User doesn't exist");
        }
    } catch (e) {
        console.error('Login failed:', e);
        res.status(500).send('Internal Server Error');
    }
});

app.post('patientDashboard',async (req,res)=>{
    try {
        const existingUser = await patients.findOne({ username: req.body.username });
        console.log(existingUser)
        res.send(existingUser)
    }
    catch (e) {
        console.log(e)
    }
})