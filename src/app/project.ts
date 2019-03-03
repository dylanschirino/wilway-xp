import * as moment from 'moment';

export class Project {
  id: number;
  name: string;
  townTitle: string;
  startdate: moment.Moment;
  stopdate: moment.Moment;
  themes: any;
}
