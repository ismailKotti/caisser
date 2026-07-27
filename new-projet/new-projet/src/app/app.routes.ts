import { Routes } from '@angular/router';
import { CaisseComponent } from './components/caisse/caisse';
import { ArchiveComponent } from './archive/archive';
import { PaiementComponent } from './paiement/paiement';
import { ArchivePaiementComponent } from './archive-paiement/archive-paiement';
import { LoginComponent } from './login/login';
import { ListingComponent } from './components/listing/listing';
import { AjouterComponent } from './components/ajouter/ajouter';
import { CategorieComponent } from './components/categorie/categorie';

export const routes: Routes = [

{
path:'login',
component:LoginComponent
},

{
path:'caisse',
component:CaisseComponent
},

{
path:'listing',
component:ListingComponent
},

{
path:'ajouter',
component:AjouterComponent
},

{
path:'categorie',
component:CategorieComponent
},

{
path:'archive',
component:ArchiveComponent
},

{
path:'paiement',
component:PaiementComponent
},

{
path:'archive-paiement',
component:ArchivePaiementComponent
},

{
path:'',
redirectTo:'login',
pathMatch:'full'
},

{
path:'**',
redirectTo:'login'
}

];