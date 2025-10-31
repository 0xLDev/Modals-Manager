import { separateConfirmModalProps } from './separateConfirmModalProps';
import { separateModalProps } from './separateModalProps';

import type { ModalsState } from '../reducer';

export const getCurrentModal = (modalState: ModalsState) => {
  const currentModal = modalState.current;

  switch (currentModal?.type) {
    case 'content': {
      const { modalProps } = separateModalProps(currentModal.props);

      return {
        modalProps
      };
    }
    case 'confirm': {
      const { modalProps } = separateConfirmModalProps({ modalId: currentModal.id, ...currentModal.props });

      return {
        modalProps
      };
    }
    default: {
      return {
        modalProps: {}
      };
    }
  }
};
