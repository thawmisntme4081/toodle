import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import _ from 'lodash'

import { ModalName } from '@/types/modal.type'

type TypeModal = 'create' | 'update' | 'delete'

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

type OpenModal = Pick<ModalState, 'type' | 'data'> & { name: ModalName }

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
        _.capitalize(action.payload.type as string) + ' ' + action.payload.name
      state.dangerDescription =
        action.payload.type === 'delete' && action.payload?.data?.name
          ? `Are you sure you want to ${action.payload.type} ${action.payload.data.name}?`
          : ''
    },
    closeModal: (state) => {
      state.open = false
      state.name = null
      state.data = null
      state.type = null
    },
  },
})

export const { openModal, closeModal } = modalSlice.actions
export const { reducer: modalReducer } = modalSlice
