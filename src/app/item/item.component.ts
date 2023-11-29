import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  items: any[] = [];
  currentItem: any = {};
  searchTerm: string = '';


  constructor(private itemService: ItemService, private toastr: ToastrService, private httpClient: HttpClient) { }


  ngOnInit(): void {
    this.getItems();
  }


  getItems(): void {
    this.itemService.getItems()
      .subscribe((items) => {
        this.items = items;
      });
  }


  getItemById(id: string): void {
    this.itemService.getItemById(id)
      .subscribe((item) => {
        this.currentItem = item;
      });
  }


  createItem(item: any): void {
    this.itemService.createItem(item)
      .subscribe(() => {
        this.getItems();
        this.currentItem = {};
        this.toastr.success('Operación exitosa', 'Éxito'); // Muestra una notificación de éxito
      });
  }

  updateItem(id: string, item: any): void {
    this.itemService.updateItem(id, item)
      .subscribe(() => {
        this.getItems();
        this.currentItem = {};
        this.toastr.success('Operación exitosa', 'Éxito'); // Muestra una notificación de éxito
      });
  }

  deleteItem(id: string): void {
    if (window.confirm('¿Estás seguro de que deseas eliminar este elemento?')) {
      this.itemService.deleteItem(id)
        .subscribe(() => {
          this.getItems();
          this.toastr.success('Operación exitosa', 'Éxito'); // Muestra una notificación de éxito
        });
    }
  }

  editItem(id: string): void {
    this.getItemById(id);
  }

  get filteredItems(): any[] {
    const lowerSearchTerm = this.searchTerm.toLowerCase(); // Convertir a minúsculas para ser insensible a mayúsculas y minúsculas
    return this.items.filter((item) =>
      item.title.toLowerCase().includes(lowerSearchTerm) || // Filtrar por título
      item.developer.toLowerCase().includes(lowerSearchTerm) || // Filtrar por desarrollador
      item.genre.toLowerCase().includes(lowerSearchTerm) || // Filtrar por género
      item.platform.toLowerCase().includes(lowerSearchTerm) // Filtrar por plataforma
    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
        // Utiliza el servicio para cargar el archivo
        this.itemService.uploadImage(file).subscribe((response) => {
            // Handle the response from the server if needed
            console.log('Imagen cargada con éxito:', response);
        });
    }
  }

}
