import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../student';
import { FormBuilder, FormGroup } from '@angular/forms';

import { inject, signal, TemplateRef, WritableSignal } from '@angular/core';

import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {

  isEditing: boolean = false;
  students: Student[] = [];
  student!: Student;
  formGroupStudent: FormGroup;
  formGroupStudentEdit: FormGroup;

  constructor(private service: StudentService,
    private formBuilder: FormBuilder
  ) {
    this.formGroupStudent = formBuilder.group({
      id: [''],
      name: [''],
      course: ['']
    });

    this.formGroupStudentEdit = formBuilder.group({
      id: [''],
      name: [''],
      course: ['']
    });

  }

  ngOnInit(): void {
    this.getStudent();
  }

  getStudent() {
    this.service.getAll().subscribe({
      next: json => this.students = json
    });
  }

  save() {
    this.service.saveStudent(this.formGroupStudent.value).subscribe(
      {
        next: json => {
          this.students.push(json);
          this.formGroupStudent.reset();
        }
      }
    )
  }

  delete(s: Student) {
    this.service.delete(s).subscribe({
      next: json => {
        this.getStudent();
      }
    })
  }

  update(){
    this.service.update(this.formGroupStudentEdit.value).subscribe({
      next: json => {
        this.getStudent();
      }
    })
  }

  clickUpdate(student: Student) {
    this.isEditing = true;
    this.formGroupStudentEdit.setValue(student);
  }

  private modalService = inject(NgbModal);
	closeResult: WritableSignal<string> = signal('');

	open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then(
			(result) => {
			},
			(reason) => {
			},
		);
	}
}
