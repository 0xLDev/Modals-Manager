import React, { useCallback, useReducer } from 'react';

import { randomId } from './lib/randomId';
import { Modal } from './ui/Modal';
import { ModalsContext } from './Context';
import { useModalsEvents } from './events';
import { modalsReducer } from './reducer';
import { getCurrentModal } from './utils/getCurrentModal';

import type { OpenConfirmModal, ModalsContextProps, OpenContentModal } from './types';

export const ModalsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(modalsReducer, { modals: [], current: null });

  const openModal = useCallback(
    ({ modalId, ...props }: OpenContentModal) => {
      const id = modalId || randomId();
      dispatch({
        type: 'OPEN_MODAL',
        modal: {
          id,
          type: 'content',
          props
        }
      });
      return id;
    },
    [dispatch]
  );

  const openConfirmModal = useCallback(
    ({ modalId, ...props }: OpenConfirmModal) => {
      const id = modalId || randomId();
      dispatch({
        type: 'OPEN_MODAL',
        modal: {
          id,
          type: 'confirm',
          props
        }
      });
      return id;
    },
    [dispatch]
  );

  const closeModal = useCallback(
    (id?: string, canceled?: boolean) => {
      const currentModalId = state.modals.find((modal) => modal.id === id)?.id || (state.current?.id as string);

      dispatch({ type: 'CLOSE_MODAL', modalId: currentModalId, canceled });
    },
    [state, dispatch]
  );

  const closeAll = useCallback(
    (canceled?: boolean) => {
      dispatch({ type: 'CLOSE_ALL_MODALS', canceled });
    },
    [state, dispatch]
  );

  useModalsEvents({
    openModal,
    openConfirmModal,
    closeModal,
    closeAll
  });

  const contextModal: ModalsContextProps = {
    modals: state.modals,
    openModal,
    openConfirmModal,
    closeModal,
    closeAll
  };

  const { modalProps: currentModalProps } = getCurrentModal(state);

  return (
    <ModalsContext.Provider value={contextModal}>
      <Modal
        open={state.modals.length > 0}
        onClose={() => closeModal(state.current?.id as string)}
        {...currentModalProps}
      />
      {children}
    </ModalsContext.Provider>
  );
};
