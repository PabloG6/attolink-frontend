import { Pipe, PipeTransform } from '@angular/core';
import beautify from 'json-beautify';

@Pipe({
  name: 'beautifyJson'
})
export class BeautifyJsonPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    return beautify(value, null, 2, 100);
  }

}
