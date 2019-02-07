import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UtilService } from '../services/util.service';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    constructor(private util: UtilService) {
        this.currentUser = this.util.getUserData();
    }

    ngOnInit() {

    }
}