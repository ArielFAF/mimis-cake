import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { RouterModule, Routes } from '@angular/router';

import { FormsModule} from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// firebase
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';

// services
import { IngredienteService } from './services/ingrediente.service';

// components
import { IngredientesComponent } from './components/ingredientes/ingredientes.component';
import { IngredienteComponent } from './components/ingredientes/ingrediente/ingrediente.component';
import { ListIngredientesComponent } from './components/ingredientes/list-ingredientes/list-ingredientes.component';
import { RecetarioComponent } from './components/recetario/recetario.component';
import { RecetaComponent } from './components/receta/receta.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recetario', pathMatch: 'full' },
  { path: 'ingredientes', component: IngredientesComponent },
  {
    path: 'recetario',
    children: [
      { path: '', component: RecetarioComponent },
      {
        path: 'receta',
        component: RecetaComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    IngredientesComponent,
    IngredienteComponent,
    ListIngredientesComponent,
    RecetarioComponent,
    RecetaComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [
    IngredienteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
