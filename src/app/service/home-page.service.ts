import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { format } from 'date-fns';

@Injectable()
export class HomePageService {

  constructor(
    public http: HttpClient
  ) { }
}