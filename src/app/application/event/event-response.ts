type CandidatesResponse = {
  [candidateId: string]: {
    contents: string,
    sortOrder: number
  }
}

export interface AnswerResponse {
  candidateId: string,
  chosen     : number
}

export interface AnswersResponse {
  [userId: string]: {
    answer : AnswerResponse[],
    comment: string
  }
}

export interface EventResponse {
  candidates: CandidatesResponse
  comment   : string
  created   : number
  creator   : string
  due       : number
  group     : string
  modified  : number
  name      : string
  version   : number
  $key      : string
  answers   : AnswersResponse
}
