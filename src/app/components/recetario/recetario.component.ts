import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecetaService } from 'src/app/services/receta.service';
import { Receta } from 'src/app/models/receta';

@Component({
  selector: 'app-recetario',
  templateUrl: './recetario.component.html',
  styleUrls: ['./recetario.component.css']
})
export class RecetarioComponent implements OnInit {

  recetasList = [
    {
      nombre: 'Donas'
    }, {
      nombre: 'Pizza'
    }
  ];

  busqueda: '';

  listRecetas: Receta[];

  constructor(private router: Router,private recetaService: RecetaService) { }

  ngOnInit() {
    this.recetaService.obtenerRecetas()
      .snapshotChanges()
      .subscribe(item => {
        this.listRecetas = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["key"] = element.key;
          this.listRecetas.push(x as Receta);
        })
      });
  }

  onSubmit() {
    alert('buscara recetas...');
  }

  onNew() {
    // alert('grabara nueva receta...');
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

  onDelete(texto: any) {
    alert('eliminara la receta ' + texto);
  }

}
