import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   
  loginUserData = {}
  constructor(private _auth: AuthService) { }

  ngOnInit() {
  }

  loginUser()
  {
     //console.log(this.loginUserData);
     this._auth.loginUser(this.loginUserData)
       .subscribe(
         res1=>console.log(res1),
         err1=>console.log(err1)
       )
  }

}
