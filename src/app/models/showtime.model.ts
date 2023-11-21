export class ShowtimeModel {
  id: string = '';
  screen: string = '';
  ticketPrice: string = '';
  startTime!: any;
  endTime!: any;
  movie: string = '';
  theater: string = '';
  hideShowTime?: boolean;
  constructor() {}
}
