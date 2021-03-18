//Tout en haut ce sont les imports 
const mongoose = require('mongoose');
const express = require('express');
const { stringify } = require('querystring');

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


// ------------------ ON FAIT DES TRUCS 1 -----------------
//Définition schéma: 
const requestSchema = new mongoose.Schema({
    rawHeaders: Array,
    url : String,
    query:Object,
    date:{
        type: Date,
        default: Date.now
    }
});
//Création du modèle 
const requestModel = mongoose.model('request', requestSchema,'requestFromUsers');


// ---------------- FIN ON FAIT DES TRUCS 1-----------------



//Définition d'un modele sur la base du schema
const myModel = mongoose.model('airbnb', mySchema,'listingsAndReviews');
//On effectue ensuite la recherche :
const count = myModel.find().countDocuments();
count.exec((err, result) => {
    console.log('Resultat count : '+ result);
})



app.get('/api', (request, response) => {

// --------------------- ON FAIT DES TRUCS 2 -----------------

//Instanciation du model 
const newRequest = new requestModel(request);
newRequest.save((err, data) => {
    if (err) console.log(err);
    console.log('Request saved : '+ data);
});

// --------------- FIN ON FAIT DES TRUCS 2-----------------
    //console.log(request);
    const limit = request.query.limit ? parseInt(request.query.limit) : 10;
    const q = request.query.q ? new RegExp('^' + request.query.q) : new RegExp('^a');
    //on ajoute une condition pour chercher dans name et summary
    const condition = {$or:[{name:q},{summary:q}]};
    //On affiche les résultats de la requête mongo sur le serveur Express à l'adresse /api
    const listing = myModel.find(condition, {_id:1, name:1, listing_url:1}).skip(10).limit(limit).sort({_id:1});
    listing.exec((err, result) => {
        //console.log(result);
        response.send(result);
    })
})




//Affiche les 5 premiers noms de la liste en sipant les 10 premiers 
// const listing= myModel.find({name:/a/}, {name:1}).skip(10).sort({_id:1});
// listing.exec((err, result)=> {
//     console.log(result);
// })