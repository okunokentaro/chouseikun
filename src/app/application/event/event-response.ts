import {Answers} from './event'

type CandidatesResponseV01 = {[id: string]: string} | undefined

type CandidatesResponseV02 = {
  [id: string]: {
    value: string,
    sortOrder: number
  }
} | undefined

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
  answers   : Answers
}

export type EventResponse =
  EventResponseV03 |
  EventResponseV02 |
  EventResponseV01
