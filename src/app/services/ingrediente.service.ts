import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { Ingrediente } from '../models/ingrediente';

@Injectable({
  providedIn: 'root'
})
export class IngredienteService {

  listIngredientes: AngularFireList<any>;

  selectedIngrediente: Ingrediente = new Ingrediente();

  constructor(private firebase: AngularFireDatabase) { }

  obtenerIngredientes() {

    return this.listIngredientes = this.firebase.list('ingredientes');

  }

  insertarIngrediente(ingrediente: Ingrediente) {
    this.listIngredientes.push({
      nombre: ingrediente.nombre,
      unidad: ingrediente.unidad
    });
  }

  actualizarIngrediente(ingrediente: Ingrediente) {
    this.listIngredientes.update(ingrediente.$key, {
      nombre: ingrediente.nombre,
      unidad: ingrediente.unidad
    });
  }

  eliminarIngrediente($key: string) {
    this.listIngredientes.remove($key);
  }
}