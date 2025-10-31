import React from 'react';

import { ConfirmModalActions } from '../ui/Modal/ModalActions';

import type { OpenConfirmModal, ModalWithActionsSettings } from '../types';

export const separateConfirmModalProps = (props: OpenConfirmModal) => {
  if (!props) {
    return { modalProps: {} };
  }

  const { modalId, labels, ...rest } = props;

  const { onConfirm, buttonProps, ...others } = rest as ModalWithActionsSettings;

  return {
    modalProps: {
      ...(!props.modalFooter && { modalFooter: <ConfirmModalActions modalId={modalId} {...props} /> }),
      ...others
    }
  };
};
