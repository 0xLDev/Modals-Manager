import type { ModalState, ModalAction, ModalWithActionsSettings } from './types';

export interface ModalsState {
  modals: ModalState[];
  current: ModalState | null;
}

const onCloseModal = (modal: ModalState, canceled?: boolean) => {
  if (canceled && modal.type === 'confirm') {
    const confirmModal = modal.props as ModalWithActionsSettings;
    confirmModal.onCancel?.();
  }

  modal.props.onClose?.();
};

export const modalsReducer = (state: ModalsState, action: ModalAction): ModalsState => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        current: action.modal,
        modals: [...state.modals, action.modal]
      };
    case 'CLOSE_MODAL':
      const modal = state.modals.find((modal) => modal.id === action.modalId);

      if (!modal) {
        return state;
      }

      onCloseModal(modal, action.canceled);

      const remainingModals = state.modals.filter((modal) => modal.id !== action.modalId);

      return {
        current: remainingModals[remainingModals.length - 1] || state.current,
        modals: remainingModals
      };
    case 'CLOSE_ALL_MODALS':
      if (!state.modals.length) {
        return state;
      }

      [...state.modals].reverse().forEach((modal) => {
        onCloseModal(modal, action.canceled);
      });

      return {
        current: state.current,
        modals: []
      };
    default:
      return state;
  }
};
