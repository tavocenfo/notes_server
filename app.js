require("dotenv").config();
const express = require("express");

const userRoute = require("./routes/user_route");
const notesRoute = require("./routes/notes_route");
const tagsRoute = require("./routes/tags_route");


const app = express();

app.use(express.json({ limit: "50mb" }));
app.use('/user', userRoute);
app.use('/notes', notesRoute);
app.use('/tags', tagsRoute);

// Logic goes here

// app.post("/register", async (req, res) => {

//     // Our register logic starts here
//     try {
//       // Get user input
//       const { first_name, last_name, email, password } = req.body;
  
//       // Validate user input
//       if (!(email && password && first_name && last_name)) {
//         res.status(400).send("All input is required");
//       }
  
//       // check if user already exist
//       // Validate if user exist in our database
//       const oldUser = await User.findOne({ email });
  
//       if (oldUser) {
//         return res.status(409).send("User Already Exist. Please Login");
//       }
  
//       //Encrypt user password
//       encryptedPassword = await bcrypt.hash(password, 10);
  
//       // Create user in our database
//       const user = await User.create({
//         first_name,
//         last_name,
//         email: email.toLowerCase(), // sanitize: convert email to lowercase
//         password: encryptedPassword,
//       });
  
//       // Create token
//       const token = jwt.sign(
//         { user_id: user._id, email },
//         process.env.TOKEN_KEY,
//         {
//           expiresIn: "2h",
//         }
//       );
//       // save user token
//       user.token = token;
  
//       // return new user
//       res.status(201).json(user);
//     } catch (err) {
//       console.log(err);
//     }
//     // Our register logic ends here
//   });

//   app.post("/login", async (req, res) => {

//     // Our login logic starts here
//     try {
//       // Get user input
//       const { email, password } = req.body;
  
//       // Validate user input
//       if (!(email && password)) {
//         res.status(400).send("All input is required");
//       }
//       // Validate if user exist in our database
//       const user = await User.findOne({ email });
  
//       if (user && (await bcrypt.compare(password, user.password))) {
//         // Create token
//         const token = jwt.sign(
//           { user_id: user._id, email },
//           process.env.TOKEN_KEY,
//           {
//             expiresIn: "2h",
//           }
//         );
  
//         // save user token
//         user.token = token;
  
//         // user
//         res.status(200).json(user);
//       }
//       res.status(400).send("Invalid Credentials");
//     } catch (err) {
//       console.log(err);
//     }
//     // Our register logic ends here
//   });


// const bodyParser = require('body-parser');
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }));

// var tags = [
//     { id: 1, name: "Trabajo" },
//     { id: 2, name: "Personal" }
// ];

// var notes = [
//     { id: 1, title: "Android Room", description: "Clase donde veremos como crear un local database", date_created: 1, tag: tags[0] },
//     { id: 2, title: "Limpiar Cuarto", description: "Ordernar y botar cosas innecesarias", date_created: 1, tag: tags[1] },
//     { id: 3, title: "Android Retrofit", description: "Clase donde veremos como crear conexiones a un server", date_created: 1, tag: tags[0] }
// ];


// Notes Crud
// app.get('/notes', auth, (req, res, next) => {
//     console.log("Getting notes");
//     res.status(200).send(notes);
// });

// app.post('/notes',auth, (req, res, next) => {
//     try {
//         const note = {
//             id: lastNoteId,
//             title: req.body.title,
//             description: req.body.description,
//             date_created: req.body.date_created,
//             tag: tags.find(element => element.id == req.body.tag.id)
//         };
//         lastNoteId++;
//         notes.push(note);
//         console.log("Note Added");
//         res.status(200).send(note);
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Error Adding a new note");
//     }

// });

// app.delete('/notes/:id',auth, (req, res, next) => {
//     try {
//         const index = notes.findIndex(element => element.id == req.params.id);
//         if (index > -1) {
//             notes.splice(index, 1)
//             console.log("Note Deleted");
//             res.status(200).send("Element was deleted");
//         } else {
//             res.status(404).send("Element not found");
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Error Deleting a note");
//     }
// });

// app.put('/notes/:id',auth, (req, res, next) => {
//     try {
//         const index = notes.findIndex(element => element.id == req.params.id);
//         if (index > -1) {
//             notes[index].title = req.body.title;
//             notes[index].description = req.body.description;
//             notes[index].date_created = req.body.date_created;
//             notes[index].tag= tags.find(element => element.id == req.body.tag.id);
//             console.log("Note Updated");
//             res.status(200).send(notes[index]);
//         } else {
//             res.status(404).send("Element not found");
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Error Deleting a note");
//     }
// });

// // Tags Crud
// app.get('/tags',auth, (req, res, next) => {
//     console.log("Getting Tags");
//     res.status(200).send(tags);
// });

// app.post('/tags',auth, (req, res, next) => {
//     try {
//         const tag = {
//             id: lastTagId,
//             name: req.body.name
//         };
//         lastTagId++;
//         tags.push(tag);
//         console.log("Tag Added");
//         res.status(200).send(tag);
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Error Adding a new tag");
//     }
// });

// app.delete('/tags/:id',auth, (req, res, next) => {
//     try {
//         const index = tags.findIndex(element => element.id == req.params.id);
//         if (index > -1) {
//             // delete tag
//             tags.splice(index, 1);
//             // delete notes related to the tag
//             notes = notes.filter(element => element.tag.id != req.params.id);
//             console.log("Tag Deleted");
//             res.status(200).send("Element was deleted");
//         } else {
//             res.status(404).send("Element not found");
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Error Deleting a note");
//     }
// });

// app.put('/tags/:id',auth, (req, res, next) => {
//     try {
//         const index = tags.findIndex(element => element.id == req.params.id);
//         if (index > -1) {
//             tags[index].name = req.body.name;
//             console.log("Tag Updated");
//             res.status(200).send(tags[index]);
//         } else {
//             res.status(404).send("Element not found");
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Error Deleting a note");
//     }
// });
  

module.exports = app;