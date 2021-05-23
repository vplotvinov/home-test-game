import * as actionTypes from './action-types'

export type AppAction = {
  type: string
}

export const setCurrentUser = (currentUser: { [key: string]: any }) => {
  return (dispatch: any) => {
    console.log(currentUser)
  }
}
