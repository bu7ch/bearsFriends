//  configuration basique
const express = require('express');
const app = express();
const Bear = require('./app/models/bear');

const port = process.env.PORT || 5000;
//  config database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/grenoblebear_db', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, "connexion error"));
db.once('open', () => {
  console.log(`[MongoDB OK]`); 
})
app.use(express.urlencoded({extended : true}));
app.use(express.json());


//  ----- Les routes de mon API --------
const router = express.Router();

// middleware----------------------------------------------------------------
//  pour toutes les requêtes
router.use((req, res, next) => {
  // tu vas faire quelque chose
  console.log("do something !");
  next();
})
router.get('/', (req, res) => {
  res.json({message: 'Bienvenue sur notre api'});
})

router.route('/bears')
//  creation d'un ours avec l'url (localhost:5000/api/bears/)
.post((req, res) => {
  const bear = new Bear(req.body);
  bear.save((err,bear) => {
    if (err) throw err;
    res.json({message : 'Ours crée !!'})
  })
})
.get((req, res)=>{
  Bear.find({}, (err, bears)=> {
    if (err) throw err;
    res.json(bears);
  })
})
router.route('/bears/:bear_id')
.get((req, res) => {
  Bear.findById(req.params.bear_id, (err, bear) => {
    if (err) throw err;
    res.json(bear);
  })
})
.put( async (req, res) => {
  // Bear.findById(req.params.bear_id, (err, bear) => {
  //   if(err) throw (err);
  //   Object.assign(bear, req.body).save((err, bear) => {
  //     if(err) throw (err);
  //     res.json({ message: 'Book updated!', bear });
  //   });
  // });
  // v2
//   const bear = await Bear.updateOne({_id:req.params.bear_id}, {
//     $set:{
//       name :req.body.name
//     }
//   });
// res.json({message : "bear updated!", bear}); 
})

// ---- Les routes enregistrées --------

app.use('/api', router)

// ------ Lancer le server --------------------------------
app.listen(port, () => {
  console.log(`Magic happens on port : ${port}`);
})
