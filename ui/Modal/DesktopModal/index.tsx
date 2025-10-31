import { Modal as AntModal } from 'antd';
import React from 'react';

import type { ModalProps } from '../../../types';

import './style.pcss';

export const DesktopModal = ({
  modalBody,
  modalFooter,
  onClose,
  centered = true,
  withCloseButton = false,
  ...props
}: ModalProps): JSX.Element => (
  <AntModal
    onCancel={onClose}
    closable={withCloseButton}
    centered={centered}
    {...(modalFooter ? { footer: modalFooter } : { footer: null })}
    {...props}
  >
    {modalBody}
  </AntModal>
);
