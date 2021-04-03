import { Component, OnInit } from '@angular/core';

import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  loginUserData = {} as any;
  listUser = {} as any;
  list = {} as any;
  incorrect = false;
  data;


  constructor(private auth: AuthService, private router: Router,private http:HttpClient) { }


  ngOnInit(): void {

    this.auth.getListusers().subscribe((res) => {
      this.listUser = res;
    });
  }



  loginUser() {

  /*  if (this.loginUserData.email === 'admin' && this.loginUserData.password === 'admin' ) {
          localStorage.setItem('role', 'supA');
          this.router.navigate(['/gpark']);
            
    }*/
    // tslint:disable-next-line:prefer-for-of

    console.log("testLogin")
    this.http.post("/api/list/curentUser", { email: this.loginUserData.email }).subscribe(data => {
      const resSTR = JSON.stringify(data);
      const resJSON = JSON.parse(resSTR);
      this.data = resJSON;
     
      console.log('curentUser: ' +  JSON.stringify(resJSON[0]._id))
      localStorage.setItem('userId',  JSON.stringify(resJSON[0]._id));
 localStorage.setItem('admin',  "true");
 
    });

    this.auth.loginSUP(this.loginUserData)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('name', 'superviseur');
        localStorage.setItem('roles', JSON.stringify(res));
        localStorage.setItem('role', 'sup');
        this.router.navigate(['/gpark']);
        this.incorrect = false;
      },
      err => console.log(err)
    );
    this.auth.loginAdmin(this.loginUserData)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('name', 'admin');
          localStorage.setItem('roles', JSON.stringify(res));
          localStorage.setItem('role', 'admin');
          this.router.navigate(['/gpark']);
          this.incorrect = false;
        },
        err => console.log(err)
      );

    this.auth.loginSUPA(this.loginUserData)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('name', this.loginUserData.email);
          
          localStorage.setItem('role', 'supA');
          this.router.navigate(['/gpark']);
          this.incorrect = false;
        },
        err => console.log(err)
      );

      



  }

}
