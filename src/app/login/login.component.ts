import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData = {} as any;
  listUser = {} as any;
  list = {} as any;
  incorrect = false;
data:any

  constructor(private auth: AuthService, private router: Router, private http: HttpClient) { }


  ngOnInit(): void {
 localStorage.setItem('admin',  "false");
    this.auth.getListusers().subscribe((res) => {
      this.listUser = res;
     
      localStorage.setItem("userId", this.listUser[1]._id)
      console.log("userList: " + this.listUser[1]._id)
    });
  }



  loginUser() {
    console.log("current Email: "+this.loginUserData.email)
    this.http.post("/api/list/curentSimpleUser", { email: this.loginUserData.email }).subscribe(data => {
      const resSTR = JSON.stringify(data);
      const resJSON = JSON.parse(resSTR);
      this.data = resJSON;
      console.log('curentUser: ' +  JSON.stringify(resJSON[0]._id))
      localStorage.setItem('userId',  JSON.stringify(resJSON[0]._id));
 console.log("UserId: !!"+ JSON.stringify(resJSON[0]._id))
 
    });
    // tslint:disable-next-line:prefer-for-of

    this.auth.loginUser(this.loginUserData)
      .subscribe(
        res => {

          localStorage.setItem('token', res.token);
          localStorage.setItem('name', this.loginUserData.email);
          this.router.navigate(['/map']);
          localStorage.setItem('role', 'user');
          this.incorrect = false;
        },
        err => console.log(err)
      );

  }

}
