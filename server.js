var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var NAV_COLLECTION = "navData";

var app = express();
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;
const MONGO_URI = 'mongodb://darshit:darshit@ds161640.mlab.com:61640/nav_data'
    // Connect to the database before starting the application server.
mongodb.MongoClient.connect(MONGO_URI, function(err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    // Save database object from the callback for reuse.
    db = database;
    console.log("Database connection ready");

    // Initialize the app.
    var server = app.listen(process.env.PORT || 8080, function() {
        var port = server.address().port;
        console.log("App now running on port", port);
    });
});


function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({ "error": message });
}

/*  "/api/contacts"
 *    GET: finds all documents
 */

app.get("/api/navInfo/all", function(req, res) {
    db.collection(NAV_COLLECTION).find({}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get Nav Info.");
        } else {
            res.status(200).json(docs);
        }
    });
});

/*  "/api/contacts/:id"
 *    GET: find contact by schemeCode
 */

app.get("/api/navInfo/schemeCode/:id", function(req, res) {

    var search = req.params.id;

    db.collection(NAV_COLLECTION).findOne({ "Scheme Code": search }, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to get contact");
        } else {
            res.status(200).json(doc);
        }
    });
});

/*  "/api/contacts/:id"
 *    GET: find contact by schemeName
 */

app.get("/api/navInfo/schemeName/:id", function(req, res) {

    var search = new ObjectID(req.params.id);

    db.collection(NAV_COLLECTION).findOne({ "Scheme Name": new RegExp(/.*search*./) }, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to get contact");
        } else {
            res.status(200).json(doc);
        }
    });
});
