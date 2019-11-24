import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Employee} from '../../models/staff/Employee';
import {Functions} from '../../models/staff/Functions';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:8080';
  private users;

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Get all the users from HTTP-request, subscribe where the data is needed
   */
  public getAllUsers(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.url}/users`);
  }

  /**
   * This method is meant for the admin to create new users
   *
   * @param user the userdetails for the created user
   */
  public createUser(email: string, firstname: string, lastname: string, password: string, role: Functions) {
    this.getAllUsers().subscribe((data) => {
      let id = data.length;
      const user = {
        email,
        password,
        firstname,
        lastname,
        role,
        id
      };

      this.httpClient.post(`${this.url}/users`, JSON.stringify(user), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).subscribe(data => console.log(data));
    });

  }

}
