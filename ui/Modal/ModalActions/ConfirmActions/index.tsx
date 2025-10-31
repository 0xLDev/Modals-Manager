import React from 'react';
import cx from 'classnames';
import { createButtonConfig } from 'somePath';
import { Button } from 'somePath';
import { DEFAULT_BUTTON_CANCEL_LABEL, DEFAULT_BUTTON_CONFIRM_LABEL } from '../../constants';
import { ActionButtonType } from '../../../../types';
import { useModals } from '../../../../hooks/useModals';

import type { OpenConfirmModal, ModalWithActionsSettings } from '../../../../types';

import { useToggle } from 'somePath';
import { TOGGLE_KEY } from 'somePath';

import './style.pcss';

export const ConfirmModalActions = (props: OpenConfirmModal) => {
  const {
    modalId,
    closeOnCancel = false,
    closeOnConfirm = false,
    labels = { cancelLabel: DEFAULT_BUTTON_CANCEL_LABEL, confirmLabel: DEFAULT_BUTTON_CONFIRM_LABEL },
    buttonProps = { preferredButton: ActionButtonType.confirm },
    onCancel,
    onConfirm
  } = props as ModalWithActionsSettings;

  const context = useModals();
  const isMobileNavigationOff = useToggle(TOGGLE_KEY.NAVIGATION_MOBILE_LK_OFF);

  const handleCancel = () => {
    typeof onCancel === 'function' && onCancel();
    Boolean(closeOnCancel) && context.closeModal(modalId as string);
  };

  const handleConfirm = () => {
    typeof onConfirm === 'function' && onConfirm();
    Boolean(closeOnConfirm) && context.closeModal(modalId as string);
  };

  const cancelButton = createButtonConfig({
    key: ActionButtonType.cancel,
    label: labels.cancelLabel,
    onClick: handleCancel,
    preferredButton: buttonProps.preferredButton === ActionButtonType.cancel
  });

  const confirmButton = createButtonConfig({
    key: ActionButtonType.confirm,
    label: labels.confirmLabel,
    onClick: handleConfirm,
    preferredButton: buttonProps.preferredButton === ActionButtonType.confirm
  });

  const sortedButtons =
    buttonProps.preferredButton === ActionButtonType.confirm
      ? [confirmButton, cancelButton]
      : [cancelButton, confirmButton];

  return (
    <div className={cx('ModalConfirmActions', { ModalConfirmActionsNoNavigation: isMobileNavigationOff })}>
      {sortedButtons.map((button) => (
        <Button
          key={button.key}
          className={button.preferredButton ? 'ButtonConfirm' : 'ButtonCancel'}
          {...(!button.preferredButton && { variant: 'ghost', textColor: 'buttons-outline-default' })}
          onClick={button.onClick}
          style={{ order: button.preferredButton ? 1 : 0 }}
        >
          {button.label}
        </Button>
      ))}
    </div>
  );
};
