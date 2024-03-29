import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';
import { Cart } from '../models/cart.model';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit{
  
  user: User | undefined; //porque aún no ha llegado del backend
  carts: Cart[] = [];

  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
      /* en vez de llamar directamente al backend, 1º, como paso previo necesito
      capturar el id de la url.
      En el componente 'user-list' este paso extra no es necesario porque allí traigo
      una lista con todo.
      */
    this.activatedRoute.params.subscribe(params => { /*sobre el 'params' te suscribes
      para capturar los parámetros y poder extraer el id de la url.
      Entonces aquí dentro debes llamar al backend y extraer el usuario por su id.
      */
      const id = params['id'];
      const backendUrl = 'https://fakestoreapi.com/users/' + id;
      this.httpClient.get<User>(backendUrl).subscribe(userFromBackend => {
        // guardar respuesta del backend
        this.user = userFromBackend;
      });
      const cartsUrl = 'https://fakestoreapi.com/carts/user/' + id;
      this.httpClient.get<Cart[]>(cartsUrl).subscribe(cartsFromBackend => {
        this.carts = cartsFromBackend;
        console.log(this.carts);
      });

   });
  }

}
