import {Pipe, PipeTransform} from '@angular/core';
import {Melding} from '../../../models/melding/melding';

@Pipe({
  name: 'meldingFilter'
})
export class MeldingFilterPipe implements PipeTransform {

  transform(meldingen: any[], searchTerm: string): any {
    if (!meldingen) {
      return [];
    }

    if (!searchTerm) {
      return meldingen;
    }
    return meldingen.filter((melding: Melding) => {
      return JSON.stringify(melding).toLowerCase().includes(searchTerm);
    });
  }

}
