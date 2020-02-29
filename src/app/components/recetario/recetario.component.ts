import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecetaService } from 'src/app/services/receta.service';
import { Receta } from 'src/app/models/receta';
import * as _ from "lodash";

import { ToastrService } from 'ngx-toastr';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-recetario',
  templateUrl: './recetario.component.html',
  styleUrls: ['./recetario.component.css']
})
export class RecetarioComponent implements OnInit {
  busqueda: string = '';

  listRecetas: Receta[];

  recetas: Receta[];

  parametro = new Receta();

  constructor(private router: Router, private recetaService: RecetaService, private toastr: ToastrService) { }

  ngOnInit() {
    this.recetaService.obtenerRecetas()
      .snapshotChanges()
      .subscribe(item => {
        this.recetas = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["key"] = element.key;
          this.recetas.push(x as Receta);
        })
        this.listRecetas = this.recetas;
      });
  }

  onNew() {
    this.recetaService.selectedReceta = new Receta();
    this.recetaService.selectedReceta.ingredientes = [];
    this.router.navigateByUrl('/recetario/receta');
  }

  onView(texto: any) {
    alert('mostrara la receta ' + texto);
  }

  onEdit(texto: any) {
    alert('editara la receta ' + texto);
  }

  buscar() {
    this.listRecetas = [];

    if (this.busqueda.length > 0) {
      _.forEach(this.recetas,
        (p: any) => {
          const b = p.nombre.search(this.busqueda);
          if (p.nombre.toLowerCase().search(this.busqueda.toLowerCase()) > -1) {
            this.listRecetas.push(p);
          }
        }
      );
    } else {
      this.listRecetas = this.recetas;
    }

  }

  onDelete(receta: Receta) {
    $('#confirmarDeleteModal').modal('show');
    this.parametro = receta;
  }

  eliminar() {
    this.recetaService.eliminarReceta(this.parametro.key);
    this.toastr.success('Recta Eliminada', '', { timeOut: 2000 });
    this.recetaService.selectedReceta = new Receta();
  }

}
