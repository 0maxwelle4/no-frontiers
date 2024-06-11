import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Pipe({
  name: 'convertBase64'
})
export class ConvertBase64Pipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(images: any): SafeResourceUrl {
    if (!images || images.length <= 0 || images === 'null') {
      return this.sanitizer.bypassSecurityTrustResourceUrl('https://i.ibb.co/vJdBBPb/no-profe-profile.jpg');
    }

    const sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64,${images}`);
    return sanitizedUrl;
  }

}
