import { Component, OnInit } from '@angular/core';
import { IngredienteService } from 'src/app/services/ingrediente.service';
import { Ingrediente } from 'src/app/models/ingrediente';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-ingredientes',
  templateUrl: './list-ingredientes.component.html',
  styleUrls: ['./list-ingredientes.component.css']
})
export class ListIngredientesComponent implements OnInit {

  listIngredientes: Ingrediente[];

  constructor(private ingredienteService: IngredienteService, 
    // private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.ingredienteService.obtenerIngredientes()
      .snapshotChanges()
      .subscribe(item => {
        this.listIngredientes = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.listIngredientes.push(x as Ingrediente);
        })
      })
  }

  onEdit(ingrediente: Ingrediente) {
    this.ingredienteService.selectedIngrediente = Object.assign({}, ingrediente);
  }

  onDelete($key: string) {
    if (confirm('Esta seguro de eliminar el ingrediente?')) {
      this.ingredienteService.eliminarIngrediente($key);
      // this.toastr.success('Eliminacion', 'Ingrediente Eliminado');
    }
  }

}
