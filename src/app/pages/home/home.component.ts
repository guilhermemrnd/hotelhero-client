import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { SearchForm } from '../../interfaces/search-form';
import { UtilsService } from './../../services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private utilService: UtilsService
  ) {}

  ngOnInit(): void {
    const formData = this.utilService.getFormData();
    this.searchForm = formData ? this.buildForm(formData) : this.buildForm();
  }

  public navigate(): void {
    if (this.searchForm.valid) {
      this.utilService.setFormData(this.searchForm.value);
      this.router.navigate(['/search'], { queryParams: this.searchForm.value });
    }
  }

  private buildForm(formData?: SearchForm): FormGroup {
    return this.formBuilder.group({
      destination: [formData?.destination ?? '', Validators.required],
      checkIn: [formData?.checkIn ?? '', Validators.required],
      checkOut: [formData?.checkOut ?? '', Validators.required],
      guests: [formData?.guests ?? '', [Validators.required, Validators.min(1)]]
    });
  }
}
