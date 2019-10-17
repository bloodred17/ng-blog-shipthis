import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datecreated'
})
export class DatecreatedPipe implements PipeTransform {

  transform(value: string): Date {
    return new Date(value);
  }

}
