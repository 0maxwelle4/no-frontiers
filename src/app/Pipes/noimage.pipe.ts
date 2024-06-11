import { Pipe, PipeTransform } from '@angular/core';
import {SafeResourceUrl} from "@angular/platform-browser";

@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {

  constructor() {}

  transform(images: any): SafeResourceUrl {
    if (!images || images.length <= 0 || images === 'null') {
      console.log(images);
      return 'https://i.ibb.co/vJdBBPb/no-profe-profile.jpg';
    }

    return `${images}`;
  }

}
