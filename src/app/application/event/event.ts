interface Candidate {
  id   : string
  value: string
}

export interface AdaptedEvent {
  candidates: Candidate[]
  comment   : string
  created   : number
  creator   : string
  due       : number
  group     : string
  modified  : number
  name      : string
  version   : number
  eventId   : string
}

export class Event {

  constructor(private item: AdaptedEvent) {}

  get candidates(): Candidate[] { return this.item.candidates }
  get comment(): string         { return this.item.comment }
  get created(): number         { return this.item.created }
  get creator(): string         { return this.item.creator }
  get due(): number             { return this.item.due }
  get group(): string           { return this.item.group }
  get modified(): number        { return this.item.modified }
  get name(): string            { return this.item.name }
  get eventId(): string         { return this.item.eventId }

}
