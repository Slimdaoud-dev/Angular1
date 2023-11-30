import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  author ={
    email:"",
    password:""
  }
  constructor(private _auth:AuthorService , private router:Router) { }

  ngOnInit(): void {
  }
  token :any;
  login() {
    this._auth.login(this.author)
      .subscribe(
        res => {

          this.token = res;
          localStorage.setItem('token', this.token.mytoken);

          this.router.navigate(['/home']);
        },
        err => {
          // If there is an error during login
          console.log(err);
        }
      );
  }

}
