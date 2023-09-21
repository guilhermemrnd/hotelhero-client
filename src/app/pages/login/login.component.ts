import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs';
import { MessageService } from 'primeng/api';

import { AuthService } from '../../auth/auth.service';
import { UserService } from './../../api/users/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  public isSignup = false;
  public errorMessage = false;
  public emailExists = false;

  public loginForm: FormGroup;
  public signupForm: FormGroup;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loginForm = this.buildLoginForm();
    this.signupForm = this.buildSignupForm();
    this.autoCheckIfEmailExist();
  }

  public toggleForm(): void {
    this.errorMessage = false;
    this.isSignup = !this.isSignup;
  }

  public login() {
    if (this.loginForm.valid) {
      const { email, password, rememberMe } = this.loginForm.value;
      this.authService.login(email, password, rememberMe).subscribe(() => {
        window.location.href = '/home';
      });
    }
  }

  public signup(): void {
    if (this.signupForm.valid) {
      const userData = this.buildNewUser();
      this.userService.createUser(userData).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Account created successfully!',
            life: 5000
          });
          this.toggleForm();
          this.signupForm.reset();
          this.loginForm.reset();
        },
        error: (err) => {
          if (err.statusCode === 409) {
            this.emailExists = true;
          }
        }
      });
    }
  }

  public isFieldInvalid(form: string, field: string): boolean {
    const control = this[form].get(field);
    return control.invalid && control.touched;
  }

  private buildLoginForm(): FormGroup {
    return this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      rememberMe: new FormControl(false)
    });
  }

  private buildSignupForm(): FormGroup {
    return this.formBuilder.group({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      terms: new FormControl(false, [Validators.requiredTrue])
    });
  }

  private autoCheckIfEmailExist() {
    this.signupForm
      .get('email')
      .valueChanges.pipe(
        tap(() => (this.emailExists = false)),
        distinctUntilChanged(),
        debounceTime(400),
        filter(() => this.signupForm.get('email').valid),
        switchMap((email) => this.userService.checkEmail(email))
      )
      .subscribe((res) => {
        this.emailExists = res.exists;
      });
  }

  private buildNewUser(): any {
    const { firstName, lastName, email, password } = this.signupForm.value;
    const fullName = `${firstName} ${lastName}`;
    return { name: fullName, email, password };
  }
}
