import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators,} from '@angular/forms';
import {LemmyService} from '../services/lemmy.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class LoginComponent {
  public loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  @Output() login: EventEmitter<{ username: string, password: string }> = new EventEmitter();

  public constructor(private readonly client: LemmyService) {
  }

  public submitLogin() {
    const {username, password} = this.loginForm.value;

    if (!username || !password) {
      return;
    }

    this.login.next({
      username: username,
      password: password
    });
  }

  // async login() {
  //   const { username_or_email, password } = this.loginForm.value;
  //
  //   if (!username_or_email || !password) {
  //     return;
  //   }
  //
  //   const response = await this.client.login(username_or_email, password);
  //   if (response.jwt) {
  //     localStorage.setItem('jwt', response.jwt);
  //   }
  // }
}
