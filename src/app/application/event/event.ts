interface Candidate {
  id   : string
  value: string
}

export interface Answer {
  candidateId: string,
  value      : number
}

export interface Answers {
  [userId: string]: {
    answer : Answer[],
    comment: string
  }
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
  answers   : Answers
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
  get answers(): Answers        { return this.item.answers }

  getAnsweredTable(): string[][] {
    const ids    = this.candidates.map(v => v.id)
    const values = this.candidates.map(v => v.value)
    values.unshift('')

    const users          = Object.keys(this.answers)
    const userAnswersMap = users.reduce((output, key) => {
      output[key] = ids.map(id => {
        const answer = this.answers[key].answer
        const target = answer.find(a => a.candidateId === id)
        return target.value
      })
      return output
    }, {})

    return values.map((v, i) => {
      if (i === 0) {
        return [v, ...users]
      }

      return [v, ...users.map(user => userAnswersMap[user][i - 1])]
    })
  }

}
