import { Injectable } from '@angular/core';
import { User } from '../models';

@Injectable()
export class UtilService {
     
    constructor() {
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

    encodeData(data:any): any{
        return data ? btoa( JSON.stringify( data ) ) : "";
    }

    decodeData(data:any): any{
        return data ? JSON.parse( atob(data) ) : "";
    }

    alert(type: number, message: string): any{
        // 1 : success, 2: error, 3: warning
        
    }
}