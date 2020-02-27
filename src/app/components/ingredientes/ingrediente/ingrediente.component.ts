import { Component, OnInit } from '@angular/core';
import { IngredienteService } from 'src/app/services/ingrediente.service';
import { NgForm } from '@angular/forms';
import { Ingrediente } from 'src/app/models/ingrediente';


@Component({
  selector: 'app-ingrediente',
  templateUrl: './ingrediente.component.html',
  styleUrls: ['./ingrediente.component.css']
})
export class IngredienteComponent implements OnInit {

  constructor(public ingredienteService: IngredienteService) { }

  ngOnInit() {
    this.ingredienteService.obtenerIngredientes();
    this.limpiarForm()
  }

  onSubmit(formIngrediente: NgForm) {
    if(formIngrediente.value.key == null) {
      this.ingredienteService.insertarIngrediente(formIngrediente.value);  
    } else {
      this.ingredienteService.actualizarIngrediente(formIngrediente.value);
    }
    // this.ingredienteService.insertarIngrediente(formIngrediente.value);
    this.limpiarForm(formIngrediente);
  }

  limpiarForm(formIngrediente?: NgForm) {
    if (formIngrediente != null) {
      formIngrediente.reset();
      this.ingredienteService.selectedIngrediente = new Ingrediente();
    };
  }
}
