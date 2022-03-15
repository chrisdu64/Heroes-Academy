import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'find'
})
export class FindPipe implements PipeTransform {

  transform(elts: any[] | null, param: any): unknown {
    if (!elts) return null;
    return elts.find(elt => elt.heroId === param);
  }

}
