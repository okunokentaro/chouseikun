export interface PartialUser {
  uid     : string
  name    : string
  photoURL: string
  googleId: string
}

interface ExtendedUser {
  groups  : string[]
  created : number
  modified: number
  version : number
}

export type User = PartialUser & ExtendedUser
