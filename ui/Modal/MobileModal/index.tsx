import React from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';

import type { ModalProps } from '../../../types';
import 'react-spring-bottom-sheet/dist/style.css';
import './style.pcss';

export const MobileModal = ({
  open,
  title,
  modalBody,
  modalFooter,
  onClose,
  maskClosable = true,
  ...props
}: ModalProps) => {
  const onDismiss = () => {
    if (!maskClosable) {
      return;
    }

    onClose?.();
  };

  return (
    <BottomSheet open={!!open} onDismiss={onDismiss} header={title} footer={modalFooter} {...props}>
      {modalBody}
    </BottomSheet>
  );
};
