import { DataService } from 'app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public auth: AuthService, public dataService: DataService) {

  }

  ngOnInit() {
  }

}
