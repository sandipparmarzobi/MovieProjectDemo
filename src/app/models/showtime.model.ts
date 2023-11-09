export class ShowtimeModel {
  screen: string;
  startTime!: Date;
  endTime!: Date;
  MovieId!: string;
  TheaterId!: string;
  TicketPrice!: number;
  constructor() {
    this.screen = '';
  }
}
