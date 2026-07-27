const express=require('express');
const cors=require('cors');
const fs=require('fs');

const app=express();

app.use(cors());
app.use(express.json());

let data=JSON.parse(
fs.readFileSync('./db.json')
);

let articles=data.articles;
let commandes=data.commandes;
let paiements=data.paiements;

function saveData(){
fs.writeFileSync(
'./db.json',
JSON.stringify({
articles,
commandes,
paiements
},null,2)
);
}

app.get('/',(req,res)=>{
res.send("API Caisse fonctionne");
});

app.get('/articles',(req,res)=>{
res.json(articles);
});

app.post('/articles',(req,res)=>{

const article={
id:Date.now(),
...req.body
};

articles.push(article);

saveData();

res.json(article);

});

app.delete('/articles/:id',(req,res)=>{

articles=articles.filter(
a=>a.id!=req.params.id
);

saveData();

res.json({
message:"Article supprimé"
});

});

app.put('/articles/:id',(req,res)=>{

const index=articles.findIndex(
a=>a.id==req.params.id
);

if(index===-1){
return res.status(404).json({
message:"Article introuvable"
});
}

articles[index]={
...articles[index],
...req.body
};

saveData();

res.json(articles[index]);

});


app.get('/commandes',(req,res)=>{
res.json(commandes);
});


app.post('/commandes',(req,res)=>{

const commande={
id:Date.now(),
articles:req.body.articles,
montant:req.body.montant,
temps:req.body.temps
};

commandes.push(commande);

saveData();

res.json(commande);

});


app.get('/paiements',(req,res)=>{
res.json(paiements);
});


app.post('/paiements',(req,res)=>{

const paiement={
id:Date.now(),
raison:req.body.raison,
montant:req.body.montant,
date:req.body.date
};

paiements.push(paiement);

saveData();

res.json(paiement);

});


app.listen(3000,()=>{
console.log(
"Serveur lancé sur http://localhost:3000"
);
});