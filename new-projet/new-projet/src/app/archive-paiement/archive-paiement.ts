import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaiementService, Paiement } from '../services/paiement';

@Component({
selector:'app-archive-paiement',
standalone:true,
imports:[
CommonModule
],
templateUrl:'./archive-paiement.html',
styleUrl:'./archive-paiement.css'
})
export class ArchivePaiementComponent implements OnInit {

paiements:Paiement[]=[];

constructor(
private paiementService:PaiementService,
private cdr: ChangeDetectorRef
){}

ngOnInit(){

this.paiementService.getPaiements()
.subscribe({

next:(data)=>{

console.log("Paiements reçus :", data);

this.paiements=data;
this.cdr.detectChanges();

},

error:(err)=>{

console.log("Erreur API paiements :",err);

}

});

}

}