import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public submitted = false;
  public wrongAuth = false;

  public loginForm: FormGroup;
  private subcription = new Subscription();
  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.createForm();
  }

  public ngOnInit(): void {
  }

  public onSubmit(form: any): void {
    this.submitted = true;
    if (!form.valid) {
      return;
    }
    const { username, password } = form.value;
    this.subcription = this.loginService.login(username, password)
      .subscribe(auth => {
        if (auth.success) {
          this.router.navigate(['main/person']);
        } else {
          this.wrongAuth = true;
        }
      });
  }

  private createForm(): FormGroup {
    return this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  public ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

}
