import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../student';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  apiUrl = "http://localhost:3000/courses";

  constructor(private http: HttpClient) { }

  getCourse() : Observable<Course[]>{
    return this.http.get<Course[]>(this.apiUrl);
  }

  postCourse(course: Course) : Observable<Course>{
    return this.http.post<Course>(this.apiUrl, course);
  }
}
