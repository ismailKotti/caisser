import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PaiementService } from '../services/paiement';
import { MontantService } from '../services/montant';

@Component({
selector:'app-paiement',
standalone:true,
imports:[
CommonModule,
FormsModule
],
templateUrl:'./paiement.html',
styleUrl:'./paiement.css'
})
export class PaiementComponent {

raison='';
montant:number|null=null;
erreur='';
succesMessage='';

raisonTouche=false;
montantTouche=false;

constructor(
private paiementService:PaiementService,
private montantService:MontantService,
private router:Router
){}

get raisonValide():boolean{
return this.raison.trim().length>0;
}

get montantValide():boolean{
return this.montant!==null&&!isNaN(this.montant)&&this.montant>0;
}

toucherRaison():void{
this.raisonTouche=true;
}

toucherMontant():void{
this.montantTouche=true;
}

bloquerCaracteresInvalides(event:KeyboardEvent):void{

const touchesAutorisees=[
'Backspace',
'Delete',
'ArrowLeft',
'ArrowRight',
'Tab',
'.'
];

const estChiffre=/^[0-9]$/.test(event.key);

if(!estChiffre&&!touchesAutorisees.includes(event.key)){
event.preventDefault();
}

}

validerPaiement():void{

this.erreur='';
this.raisonTouche=true;
this.montantTouche=true;

if(!this.raisonValide){

this.erreur='Veuillez entrer une raison.';
return;

}

if(!this.montantValide){

this.erreur='Veuillez entrer un montant valide (nombre positif).';
return;

}

let today=new Date();

let date=today.toLocaleDateString();


this.paiementService.ajouterPaiement({

raison:this.raison,

montant:this.montant as number,

date:date

})
.subscribe(()=>{


this.montantService.diminuerMontant(this.montant as number);


this.raison='';

this.montant=null;

this.raisonTouche=false;

this.montantTouche=false;


this.succesMessage='Paiement enregistre avec succes !';


setTimeout(()=>{

this.succesMessage='';

this.router.navigate(['/archive-paiement']);

},3000);


});


}

allerArchive():void{

this.router.navigate(['/archive-paiement']);

}

}