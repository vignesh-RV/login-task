import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class UtilService {
    
    loadingIcon: string = "data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==";

    constructor(private router: Router, private toastr: ToastrService) {
    }

    registerUser(newuser: User): any{
        return new Promise((resolve, reject) => {
            var users = this.decodeData( localStorage.getItem("usersList") );
            if (users && users.length) {
                var isDuplicateUser = users.some((user: User) => {
                    return user.username == newuser.username && newuser.password == user.password;
                });

                if (isDuplicateUser) {
                    resolve( false );
                    return;
                }
            } else users = [];
            newuser.id = new Date().getTime();//generating unique user id
            users.push(newuser);
            localStorage.setItem("usersList", this.encodeData(users));
            resolve( true );
        })
    }

    login(userData: any): any{
        return new Promise((resolve, reject) => {
            var users = this.decodeData( localStorage.getItem("usersList") );
            if (users && users.length) {
                var userdata = users.filter((user: User) => {
                    return user.username == userData.username && userData.password == user.password;
                });

                if (userdata && userdata.length) {
                    localStorage.setItem("currentUser", this.encodeData(userdata[0]));
                    resolve( true );
                    return;
                }
            }
            resolve( false );
        })
    }

    getUserData(userId?: any): User{
        let userData: User;
        if (!userId) {
            userData = this.decodeData( localStorage.getItem("currentUser") );
        } else {
            var users = this.decodeData( localStorage.getItem("usersList") );
            if (users && users.length) {
                var userdata = users.filter((user: User) => {
                    return user.id == userId;
                });

                if (userdata && userdata.length) {
                    userData = userdata[0];
                }
            }
        }

        return userData;
    }

    doLogout(): any{
        localStorage.removeItem("currentUser");
        this.alert(1, "Logged out Successfully");
        this.router.navigate(['/login']);
    }

    encodeData(data:any): any{
        return data ? btoa( JSON.stringify( data ) ) : "";
    }

    decodeData(data:any): any{
        return data ? JSON.parse( atob(data) ) : "";
    }

    alert(type: number, message: string): any{
        // 1 : success, 2: error, 3: warning
        switch (type) {
            case 1: { //success
                this.toastr.success(message);
                break;
            }
            case 2: { //error
                this.toastr.error(message);
                break;
            }
            case 3: { //warning
                this.toastr.warning(message);
                break;
            }
        }
    }
}