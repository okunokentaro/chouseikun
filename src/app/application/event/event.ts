interface Candidate {
  candidateId: string
  contents   : string
}

export interface Answer {
  candidateId: string,
  chosen     : number
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
  get answeredUsers(): string[] { return Object.keys(this.answers) }

  getAnsweredTable(usersMap: any): string[][] {
    const ids           = this.candidates.map(v => v.candidateId)
    const contentsArray = this.candidates.map(v => v.contents)
    contentsArray.unshift('')

    const users          = this.answeredUsers
    const userAnswersMap = users.reduce((output, key) => {
      output[key] = ids.map(id => {
        const answer = this.answers[key].answer
        const target = answer.find(a => a.candidateId === id)

        if (target.chosen === 0) {
          return '×'
        }
        if (target.chosen === 1) {
          return '△'
        }
        return '○'
      })
      return output
    }, {})

    return contentsArray.map((v, i) => {
      if (i === 0) {
        const userNames = users.map(u => usersMap[u])
        return [v, ...userNames]
      }

      return [v, ...users.map(user => userAnswersMap[user][i - 1])]
    })
  }

}
