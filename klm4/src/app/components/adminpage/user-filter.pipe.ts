import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {

  transform(users: any[], searchTerm: string): any {
    if (!users) {
      return [];
    }

    if (!searchTerm) {
      return users;
    }
    return users.filter(user => {
      return user.username.includes(searchTerm) || user.role.includes(searchTerm);
    });
  }

}
