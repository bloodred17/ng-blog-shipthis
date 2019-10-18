import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  constructor() { }

  tagsAdder(tagsArray: string[], tagsString: string){
    const convertedArr = tagsString.split(',').map(tag => tag.trim());
    if(tagsArray.length === 0){
      tagsArray = convertedArr;
      return tagsArray;
    }
    const filteredArr = tagsArray.filter((tag) => {
      return convertedArr.includes(tag);
    });
    tagsArray = [...tagsArray, ...filteredArr];
    return tagsArray;
  }
}
