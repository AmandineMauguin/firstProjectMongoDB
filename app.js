//Tout en haut ce sont les imports 
const mongoose = require('mongoose');
const express = require('express')

const app = express();
app.listen(3000);
app.get('/', (req, res) => {
    res.send('Bjr ça marche')
  })



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

//On affiche les résultats de la requête mongo sur le serveur Express à l'adresse /api
const listing = myModel.find({name: /a/}, {_id:1, name:1, listing_url:1}).skip(10).limit(20).sort({_id:1});
app.get('/api', (request, response) => {
    listing.exec((err, result) => {
        console.log(result);
        response.send(result);
    })
})


//Affiche les 5 premiers noms de la liste en sipant les 10 premiers 
// const listing= myModel.find({name:/a/}, {name:1}).skip(10).sort({_id:1});
// listing.exec((err, result)=> {
//     console.log(result);
// })