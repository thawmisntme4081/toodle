import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import _ from 'lodash'

import { ModalName } from '@/types/modal.type'
import { getDangerDescription } from '@/utils/getDangerDescription.util'

export type TypeModal = 'add' | 'update' | 'delete' | 'info'
export type TypeModalForm = Omit<TypeModal, 'delete' | 'info'>

type ModalState = {
  open: boolean
  name: ModalName | null
  type: TypeModal | null
  data?: any
  defaultTitle: string
  dangerDescription: string
}

const initialState: ModalState = {
  open: false,
  name: null,
  type: null,
  data: null,
  defaultTitle: '',
  dangerDescription: '',
}

type OpenModal = Pick<ModalState, 'data'> & {
  type: TypeModal
  name: ModalName
  dangerDescription?: string
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<OpenModal>) => {
      state.open = true
      state.name = action.payload.name
      state.data = action.payload.data
      state.type = action.payload.type
      state.defaultTitle =
        action.payload.name === 'logout'
          ? 'Confirm logout'
          : _.capitalize(action.payload.type as string) +
            ' ' +
            action.payload.name
      state.dangerDescription = getDangerDescription(
        action.payload.type,
        action.payload.name,
        action.payload.data?.name,
      )
    },
    closeModal: (state) => {
      Object.assign(state, initialState)
    },
  },
})

export const { openModal, closeModal } = modalSlice.actions
export const { reducer: modalReducer } = modalSlice
