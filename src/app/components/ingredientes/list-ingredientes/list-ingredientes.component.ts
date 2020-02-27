import { Component, OnInit } from '@angular/core';
import { IngredienteService } from 'src/app/services/ingrediente.service';
import { Ingrediente } from 'src/app/models/ingrediente';

import { ToastrService } from 'ngx-toastr';
// import * as $ from 'jquery';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-list-ingredientes',
  templateUrl: './list-ingredientes.component.html',
  styleUrls: ['./list-ingredientes.component.css']
})
export class ListIngredientesComponent implements OnInit {

  listIngredientes: Ingrediente[];

  parametro = new Ingrediente();

  constructor(private ingredienteService: IngredienteService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
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

  onEdit(ingrediente: Ingrediente) {
    this.ingredienteService.selectedIngrediente = Object.assign({}, ingrediente);
  }

  onDelete(ingrediente: Ingrediente) {
    $('#confirmarDeleteModal').modal('show');
    this.parametro = ingrediente;
  }

  eliminar() {
    this.ingredienteService.eliminarIngrediente(this.parametro.key);
    this.toastr.success('Ingrediente Eliminado', '', { timeOut: 2000 });
    this.ingredienteService.selectedIngrediente = new Ingrediente();
  }
}
