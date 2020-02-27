import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Receta } from '../models/receta';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {

  listRecetas: AngularFireList<any>;

  selectedReceta: Receta = new Receta();

  constructor(private firebase: AngularFireDatabase) { }

  obtenerRecetas() {
    return this.listRecetas = this.firebase.list('recetas', ref => ref.orderByChild('nombre'));

  }

  insertarReceta(receta: Receta) {
    this.listRecetas.push({
      nombre: receta.nombre,
      indicaciones: receta.indicaciones,
      ingredientes: this.selectedReceta.ingredientes
    });
  }

  actualizarReceta(receta: Receta) {
    this.listRecetas.update(receta.key, {
      nombre: receta.nombre,
      indicaciones: receta.indicaciones,
      ingredientes: this.selectedReceta.ingredientes
    });
  }

  eliminarReceta(key: string) {
    this.listRecetas.remove(key);
  }
}
