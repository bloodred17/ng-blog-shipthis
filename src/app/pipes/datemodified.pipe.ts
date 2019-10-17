import { Pipe, PipeTransform } from '@angular/core';
import { last } from 'rxjs/operators';

@Pipe({
  name: 'datemodified'
})
export class DatemodifiedPipe implements PipeTransform {

  transform(value: string): any {
    const lastModified = new Date(value);
    const presentTimestamp = new Date();
    let message = '';
    let difference = presentTimestamp.getTime() - lastModified.getTime();
    var daysDifference = Math.floor(difference/1000/60/60/24);
    difference -= daysDifference*1000*60*60*24;

    var hoursDifference = Math.floor(difference/1000/60/60);
    difference -= hoursDifference*1000*60*60;

    var minutesDifference = Math.floor(difference/1000/60);
    difference -= minutesDifference*1000*60;

    var secondsDifference = Math.floor(difference/1000);

    if(daysDifference > 0){
      message = `${daysDifference} days ago`;
    } else if ( hoursDifference > 0 ){
      message = `${hoursDifference} hours ago`;
    }else if ( minutesDifference > 0 ){
      message = `${minutesDifference} minutes ago`;
    }else if ( secondsDifference > 0 ){
      message = `${secondsDifference} seconds ago`;
    }
    return message;
  }
}
