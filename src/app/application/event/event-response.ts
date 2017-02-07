type CandidatesResponseV01 = {[id: string]: string} | undefined

type CandidatesResponseV02 = {
  [id: string]: {
    value: string,
    sortOrder: number
  }
} | undefined

export interface AnswerResponseV03 {
  candidateId: string,
  value      : number
}

export interface AnswersResponseV03 {
  [userId: string]: {
    answer : AnswerResponseV03[],
    comment: string
  }
}

export interface AnswerResponseV04 {
  candidateId: string,
  chosen     : number
}

export interface AnswersResponseV04 {
  [userId: string]: {
    answer : AnswerResponseV04[],
    comment: string
  }
}

export interface EventResponseV01 {
  candidates: CandidatesResponseV01
  comment   : string
  created   : number
  creator   : string
  due       : number
  group     : string
  modified  : number
  name      : string
  version   : number
  $key      : string
  answers?  : any
}

export interface EventResponseV02 {
  candidates: CandidatesResponseV02
  comment   : string
  created   : number
  creator   : string
  due       : number
  group     : string
  modified  : number
  name      : string
  version   : number
  $key      : string
  answers?  : any
}

export interface EventResponseV03 {
  candidates: CandidatesResponseV02
  comment   : string
  created   : number
  creator   : string
  due       : number
  group     : string
  modified  : number
  name      : string
  version   : number
  $key      : string
  answers   : AnswersResponseV03
}

export interface EventResponseV04 {
  candidates: CandidatesResponseV02
  comment   : string
  created   : number
  creator   : string
  due       : number
  group     : string
  modified  : number
  name      : string
  version   : number
  $key      : string
  answers   : AnswersResponseV04
}

export type EventResponse =
  EventResponseV04 |
  EventResponseV03 |
  EventResponseV02 |
  EventResponseV01
