import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { MontantService } from '../services/montant';

@Component({
  selector:'app-login',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl:'./login.html',
  styleUrl:'./login.css'
})
export class LoginComponent implements OnInit {

  mode:'login'|'oublie'='login';

  nom='';
  email='';
  motDePasse='';
  emailOublie='';

  seSouvenir=false;

  emailTouche=false;
  motDePasseTouche=false;
  emailOublieTouche=false;

  erreur='';
  message='';

  afficherFondCaisse=false;
  fondCaisse=0;

  constructor(
    private authService:AuthService,
    private router:Router,
    private montantService:MontantService
  ){}

  ngOnInit():void{
    const identifiants=this.authService.getIdentifiantsSauvegardes();

    if(identifiants){
      this.email=identifiants.email;
      this.motDePasse=identifiants.motDePasse;
      this.seSouvenir=true;
    }
  }

  get emailValide():boolean{
    const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(this.email);
  }

  get motDePasseValide():boolean{
    return this.motDePasse.length>=6;
  }

  get emailOublieValide():boolean{
    const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(this.emailOublie);
  }

  toucherEmail(){
    this.emailTouche=true;
  }

  toucherMotDePasse(){
    this.motDePasseTouche=true;
  }

  toucherEmailOublie(){
    this.emailOublieTouche=true;
  }

  seConnecter(){

    this.erreur='';

    const connexion=this.authService.login(
      this.email,
      this.motDePasse
    );

    if(connexion){

      if(this.nom.trim().toLowerCase()==='admin'){

        this.router.navigate(['/listing']);

      }else{

        this.afficherFondCaisse=true;

      }

      if(this.seSouvenir){

        this.authService.sauvegarderIdentifiants(
          this.email,
          this.motDePasse
        );

      }else{

        this.authService.effacerIdentifiants();

      }

    }else{

      this.erreur='Email ou mot de passe incorrect';

    }

  }

  validerFondCaisse(){

    if(this.fondCaisse>0){

      this.montantService.setMontantTotal(this.fondCaisse);
      this.router.navigate(['/caisse']);

    }else{

      this.erreur='Veuillez entrer un montant valide';

    }

  }

  envoyerDemandeOublie(){

    this.erreur='';
    this.message='';
    this.emailOublieTouche=true;

    if(!this.emailOublieValide){

      this.erreur='Veuillez entrer un email valide.';
      return;

    }

    this.authService.motDePasseOublie(this.emailOublie);

    this.message='Un email de reinitialisation a ete envoye si le compte existe.';

    this.emailOublie='';
    this.emailOublieTouche=false;

  }

  afficherOublie(){
    this.mode='oublie';
    this.erreur='';
    this.message='';
  }

  afficherLogin(){
    this.mode='login';
    this.erreur='';
    this.message='';
  }

}