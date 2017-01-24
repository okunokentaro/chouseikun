export type PartialUser = {
  uid     : string
  name    : string
  photoURL: string
  googleId: string
}

type ExtendedUser = {
  groups  : string[]
  created : number
  modified: number
  version : number
}

export type User = PartialUser & ExtendedUser
