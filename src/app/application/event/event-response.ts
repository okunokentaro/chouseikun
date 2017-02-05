type CandidatesResponseV1 = {[id: string]: string} | undefined

type CandidatesResponseV2 = {
  [id: string]: {
    value: string,
    sortOrder: number
  }
} | undefined

export interface EventResponseV1 {
  candidates: CandidatesResponseV1
  comment   : string
  created   : number
  creator   : string
  due       : number
  group     : string
  modified  : number
  name      : string
  version   : number
  $key      : string
}

export interface EventResponseV2 {
  candidates: CandidatesResponseV2
  comment   : string
  created   : number
  creator   : string
  due       : number
  group     : string
  modified  : number
  name      : string
  version   : number
  $key      : string
}

export type EventResponse = EventResponseV1 | EventResponseV2
