import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ItemService {
    private apiUrl = 'http://localhost:3000/api/games';


    constructor(private http: HttpClient) { }


    getItems() {
        return this.http.get<any[]>(this.apiUrl);
    }


    getItemById(id: string): Observable<any> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get(url);
    }


    createItem(item: any): Observable<any> {
        return this.http.post(this.apiUrl, item);
    }


    updateItem(id: string, item: any): Observable<any> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.put(url, item);
    }


    deleteItem(id: string): Observable<any> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete(url);
    }
    
    uploadImage(file: File): Observable<any> {
        const formData = new FormData();
        formData.append('image', file);
    
        // Cambiar la URL a la ruta correcta en tu backend para cargar imágenes
        const uploadUrl = 'http://localhost:3000/api/upload'; // Reemplaza con la URL correcta
    
        return this.http.post<any>(uploadUrl, formData);
    }
}
