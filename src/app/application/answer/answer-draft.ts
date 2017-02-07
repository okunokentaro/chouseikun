import {User} from '../user/user'
import {Answer, Answers, Event} from '../event/event'

export type AnswerModel = {[candidateId: string]: /* chosen */number}

export class AnswerDraft {

  constructor(private user: User,
              private event: Event,
              private answerModel: AnswerModel,
              private _comment: string) {
  }

  get eventId(): string  { return this.event.eventId }
  get uid(): string      { return this.user.uid }
  get comment(): string  { return this._comment || '' }
  get answers(): Answers { return this.event.answers }

  get answer(): Answer[] {
    return Object.keys(this.answerModel)
      .map(candidateId => {
        return {
          candidateId,
          chosen: this.answerModel[candidateId]
        }
      })
  }

}
