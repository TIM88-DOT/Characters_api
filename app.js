// dependencies
const express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

// run
var app = express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));


app.listen(5000, () => {
    console.log("Server running on port 5000");
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("characters");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});

// add new character end point
app.post("/characters", (request, response) => {
    collection.insert(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});

// get all characters end point
app.get("/characters", (request, response) => {
    collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

// get character by id end point
app.get("/character/:id", (request, response) => {
    collection.findOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

// delete character by id end point
app.delete('/character/:id', function(request, response) {
    var id = request.params.id;
    collection.deleteOne({
      id: id
    });
    return response.status(201).end();
  });

// updae character by id end point
  app.put('/character/:id', (request, response) => {
    collection.findOneAndUpdate(
        { "_id": request.params.id },
        {
          $set: {
            // name: req.body.name,
            // quote: req.body.quote
          }
        },
        {
          upsert: true
        }
      )
      .then(result => {
        console.log(result)
        response.json('Success')
       })
      .catch(error => console.error(error))
  });
  