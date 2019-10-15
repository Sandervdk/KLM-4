export class Wagon {
  private id: number;
  private title: string;
  private lastSeen: {};

  constructor(id: number, title: string, lastSeen: {}) {
    this.id = id;
    this.title = title;
    this.lastSeen = lastSeen;
  }

  getID() {
    return this.id;
  }

  getTitle() {
    return this.title;
  }

  getLastSeen() {
    return this.lastSeen;
  }
}
