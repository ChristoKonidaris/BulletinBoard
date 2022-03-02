import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';


let today = new Date();



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {

  userIsAuthenticated = false;
  private authListenerSubs!: Subscription;


  constructor(private authService: AuthService){}


  ngOnInit(){
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated =>{
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  onLogout(){
    /*var fs = require('fs');
    var util = require('util');
    var log_file = fs.createWriteStream('./log.txt', {flags : 'a'});
    var log_stdout = process.stdout;

    console.log = function(d) { //
    log_file.write(util.format(d) + '\n');
    log_stdout.write(util.format(d) + '\n');
    };*/

    console.log("[" +today + "]" + " User has logged out!");
    this.authService.logout();
  }

  ngOnDestroy(){

  }
}
