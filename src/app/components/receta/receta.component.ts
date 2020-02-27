import { Component, OnInit } from '@angular/core';
import { IngredienteService } from 'src/app/services/ingrediente.service';
import { Ingrediente } from 'src/app/models/ingrediente';
import { RecetaService } from 'src/app/services/receta.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from "lodash";

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {

  cantidad: any;
  busqueda: any;
  id: any;

  listIngredientes: Ingrediente[];

  selectedIngrediente: Ingrediente = new Ingrediente();

  constructor(private ingredienteService: IngredienteService, public recetaService: RecetaService, private router: Router) { }

  ngOnInit() {
    this.recetaService.obtenerRecetas();

    this.ingredienteService.obtenerIngredientes()
      .snapshotChanges()
      .subscribe(item => {
        this.listIngredientes = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["key"] = element.key;
          this.listIngredientes.push(x as Ingrediente);
        })
      });
  }

  onGrabar(formReceta: NgForm) {
    if (formReceta.value.key == null) {
      this.recetaService.insertarReceta(formReceta.value);
    } else {
      this.recetaService.actualizarReceta(formReceta.value);
    }
    
    this.router.navigateByUrl('/recetario');
  }

  onAgregarEditarIngrediente(formIngrediente: NgForm) {
    if (formIngrediente.value.key != null) {
      this.recetaService.selectedReceta.ingredientes.push({
        key: formIngrediente.value.key,
        nombre: _.find(this.listIngredientes, { 'key': formIngrediente.value.key }).nombre,
        cantidad: formIngrediente.value.cantidad,
        unidad: formIngrediente.value.unidad
      })

    } else {
      this.recetaService.actualizarReceta(formIngrediente.value);

    }
    // TODO limpiar formulario
  }

  onEdit(text: any) {
    alert('edita el ingrediente ' + text);
  }

  onDelete(text: any) {
    alert('elimina el ingrediente ' + text);
  }

  limpiarForm(formIngrediente: NgForm) {
    
  }
}
