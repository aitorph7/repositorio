import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [HttpClientModule, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  
  // Esto es una clase: 1º declaro atributos, 2º un constructor y 3º métodos.
  products: Product[] = []; // Rellenar este array con productos del backend.

  constructor(private http: HttpClient) {}

  ngOnInit(): void { /* este método se ejecuta automáticamente cuando entran en la pantalla.
      Se lanza una petición al controlador que está en el backend, quien trae los datos en 
      JSON, y se cargan como objetos 'Product'.
      Es como si fuera Postman u OpenAPI, solo que no es tan sencillo como clicar un botón,
      debo programar el comportamiento del botón. */
    // Traer los productos del backend: crea y ejecuta una petición HTTP contra un controlador Backend
    let backend = 'https://fakestoreapi.com/products';
    this.http.get<Product[]>(backend).subscribe(products => this.products = products);
    
  }

}
