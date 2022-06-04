import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeadlineService {
  url = environment.apiUrl

  constructor(private httpClient: HttpClient) { }

  getDeadlines() {
    return this.httpClient.get(this.url + "deadline/get/");
  }
}
