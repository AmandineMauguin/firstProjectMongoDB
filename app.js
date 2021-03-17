const mongoose = require('mongoose');

const URI ="mongodb+srv://admin:Mongo21&@cluster0.x67oc.mongodb.net/sample_airbnb?retryWrites=true&w=majority"
mongoose.connect(URI, {useNewUrlParser: true,
    useUnifiedTopology: true,}, (err) => {
        if (err) console.log("ERREUR, c'est raté", err);
        console.log("Connection réussie WOUHOUH");
    })



console.log('ui world');

//Définition d'un schema vide 
const mySchema = new mongoose.Schema({});

//Définition d'un modele sur la base du schema
const myModel = mongoose.model('airbnb', mySchema,'listingsAndReviews');
//On effectue ensuite la recherche :
const count = myModel.find().count();
count.exec((err, result) => {
    console.log('Resultat count : '+ result);
})

//Affiche les 5 premiers noms de la liste 
const listing= myModel.find({}, {name:1}).limit(5);
listing.exec((err, result)=> {
    console.log(result);
})