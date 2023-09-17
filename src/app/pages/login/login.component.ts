import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './../../auth/auth.service';
import { UserService } from './../../api/users/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public isSignup = false;
  public loginForm: FormGroup;
  public signupForm: FormGroup;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.buildLoginForm();
    this.signupForm = this.buildSignupForm();
  }

  public toggleForm(): void {
    this.isSignup = !this.isSignup;
  }

  public login() {
    if (this.loginForm.valid) {
      const { email, password, rememberMe } = this.loginForm.value;
      this.authService.login(email, password, rememberMe).subscribe({
        next: () => (window.location.href = '/home'),
        error: (err) => {} // Implement error handling
      });
    }
  }

  public signup(): void {
    if (this.signupForm.valid) {
      const userData = this.buildNewUser();
      this.userService.createUser(userData).subscribe({
        next: () => {
          console.log('User created.');
          this.toggleForm();
          this.signupForm.reset();
          this.loginForm.reset();
        },
        error: (err) => {} // Implement error handling
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

  private buildNewUser(): any {
    const { firstName, lastName, email, password } = this.signupForm.value;
    const fullName = `${firstName} ${lastName}`;
    return { name: fullName, email, password };
  }
}
