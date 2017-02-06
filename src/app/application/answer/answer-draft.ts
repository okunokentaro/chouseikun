import { User } from '../user/user'
import { Event } from '../event/event'

export class AnswerDraft {

  constructor(private user: User,
              private event: Event,
              private _answer: {[candidateId: string]: number},
              private _comment: string) {
  }

  get eventId(): string { return this.event.eventId }
  get uid(): string     { return this.user.uid }
  get comment(): string { return this._comment }
  get answers(): Object { return this.event.answers }

  get answer(): {candidateId: string, value: number}[] {
    return Object.keys(this._answer).map(k => {
      return {candidateId: k, value: this._answer[k]}
    })
  }

}
