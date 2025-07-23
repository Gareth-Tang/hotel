// // express app
// const express = require("express");
// const app = express();

// // Parse JSON bodies
// app.use(express.json());

// const nameList = [
//   "Amy",
//   "Betty",
//   "Cathy",
//   "Diana",
//   "Ethan",
//   "Fiona",
//   "George",
//   "Hannah",
//   "Ivy",
//   "Jack",
// ]
// // routes
// app.get("/", (req, res) => {
//   res.send(`Hello ${nameList.map((name, index) => `${index}: ${name}`).join(", ")}`);
// });

// // TASK: Add name to the nameList
// // path: /add-name
// // test using CURL: 
// // curl -X POST http://localhost:3000/add-name -H "Content-Type: application/json" -d '{"name":"John"}'
// //
// // app.post("/add-name", (req, res) => {
// //   const name = req.body.name
// //   nameList.push(name)
// //   res.send(`added ${name} to the namelist`)
// // })

// // TASK Update name in the namelist based on the id
// // path: /update-name/:id
// // test using CURL: 
// // curl http://localhost:3000/update-name/1 -X PUT -H "Content-Type: application/json" -d '{"name":"John"}'
// //
// app.put("/update-name/:id", (req, res) => {
//   const id = req.params.id;
//   const name = req.body.name;
//   if (id < 0 || id >= nameList.length) {
//     return res.status(404).send("ID not found");
//   }
//   if (!name) {
//     return res.status(400).send("Name is required");
//   }
//   if (typeof name !== "string") {
//     return res.status(400).send("Name must be a string");
//   }
//   if (name.length < 3) {
//     return res.status(400).send("Name must be at least 3 characters long");
//   }
//   if (nameList.includes(name)) {
//     return res.status(400).send("Name already exists in the list");
//   }
//   const existingName = nameList[id];
//   if (!existingName) {
//     return res.status(404).send("Name not found for the given ID");
//   }
//   // Update the name in the list
//   nameList.put(req.params.id, name)
//   res.send(`updated id ${req.params.id} to ${name}`)
// })
// // TASK Delete name from the nameList based on the id
// // path: /delete-name/:id
// // test using CURL: 
// // curl http://localhost:3000/delete-name/1 -X DELETE
// //

// app.get("/:id", (req, res) => {
//   const id = req.params.id;
//   res.send(`Hello ${nameList[id]} aaa`);
// });

// // listen
// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });



























