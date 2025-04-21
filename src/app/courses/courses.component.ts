import { Component, OnInit } from '@angular/core';
import { Course } from '../student';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {

  courses: Course[] = [];
  formGroupCourse : FormGroup;

  constructor(private formBuilder: FormBuilder, private service: CoursesService){
    this.formGroupCourse = formBuilder.group({
      id : [''],
      name : [''],
      price: [''],
      active: [false],
      promotion: [false]
 });
  }

  ngOnInit(): void {
      this.service.getCourse().subscribe({
        next: json => this.courses = json
      });
  }

  postCourse() {
    this.service.postCourse(this.formGroupCourse.value).subscribe({
      next: json => {
        this.courses.push(json);
        this.formGroupCourse.reset();
      }
    });
  }
}
