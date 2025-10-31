import type { ModalProps as AntModalProps } from 'antd';
import React from 'react';

type ExcludedAntModalProps = keyof Pick<
  AntModalProps,
  | 'onOk'
  | 'onCancel'
  | 'closable'
  | 'okText'
  | 'okType'
  | 'cancelText'
  | 'okButtonProps'
  | 'cancelButtonProps'
  | 'footer'
>;

export interface ModalProps extends Omit<AntModalProps, ExcludedAntModalProps> {
  modalId?: string;
  title?: React.ReactNode;
  modalBody?: React.ReactNode;
  modalFooter?: React.ReactNode;
  onClose?: () => void;
  withCloseButton?: boolean;
}

export enum ActionButtonType {
  confirm = 'confirm',
  cancel = 'cancel'
}

export interface CreateButtonConfigProps {
  key: string;
  label: string;
  onClick: () => void;
  preferredButton: boolean;
}

export interface ActionButtonConfig {
  key: string;
  label: string;
  onClick: () => void;
  preferredButton: boolean;
  variant?: 'primary';
}

export type ModalSettings = Omit<ModalProps, 'title' | 'modalBody' | 'modalFooter' | 'buttonProps' | 'onConfirm'> & {
  title: ModalProps['title'];
  modalBody: ModalProps['modalBody'];
  modalFooter: ModalProps['modalFooter'];
};

export interface ConfirmLabels {
  confirmLabel: string;
  cancelLabel: string;
}

export interface ContentLabels {
  buttonLabel: string;
}

export interface ConfirmButtonProps {
  preferredButton: 'confirm' | 'cancel';
}

interface ConfirmBaseModalSettings extends Omit<ModalSettings, 'modalFooter' | 'onClose'> {
  modalFooter?: ModalProps['modalFooter'];
  onClose?: ModalProps['onClose'];
  modalId?: string;
  labels?: ConfirmLabels;
  closeOnCancel?: boolean;
  closeOnConfirm?: boolean;
}

interface ModalWithFooterSettings extends ConfirmBaseModalSettings {
  modalFooter?: ModalProps['modalFooter'];
  labels?: never;
  onConfirm?: never;
  onCancel?: never;
}

export interface ModalWithActionsSettings extends ConfirmBaseModalSettings {
  buttonProps?: ConfirmButtonProps;
  labels?: ConfirmLabels;
  onConfirm: () => void;
  onCancel: () => void;
  modalFooter?: never;
}

interface ContentBaseModalSettings extends Omit<ModalSettings, 'modalFooter' | 'onClose'> {
  labels?: ContentLabels;
  onClose: ModalProps['onClose'];
}

interface ContentModalWithFooterSettings extends ContentBaseModalSettings {
  modalFooter?: ModalProps['modalFooter'];
  labels?: never;
  onClose: never;
}

interface ContentModalWithActionsSettings extends ContentBaseModalSettings {
  labels?: never;
  onClose: ModalProps['onClose'];
  modalFooter?: never;
}

export type OpenContentModal = ContentModalWithActionsSettings | ContentModalWithFooterSettings;

export type OpenConfirmModal = ModalWithActionsSettings | ModalWithFooterSettings;

export type ModalState =
  | { id: string; props: OpenContentModal; type: 'content' }
  | { id: string; props: OpenConfirmModal; type: 'confirm' };

interface OpenAction {
  type: 'OPEN_MODAL';
  modal: ModalState;
}

interface CloseAction {
  type: 'CLOSE_MODAL';
  modalId: string;
  canceled?: boolean;
}

interface CloseAllAction {
  type: 'CLOSE_ALL_MODALS';
  canceled?: boolean;
}

export type ModalAction = OpenAction | CloseAction | CloseAllAction;

export interface ModalsContextProps {
  modals: ModalState[];
  openModal: (props: OpenContentModal) => string;
  openConfirmModal: (props: OpenConfirmModal) => string;
  closeModal: (id: string) => void;
  closeAll: () => void;
}

export type ModalsEvents = {
  openModal: (payload: OpenContentModal) => void;
  openConfirmModal: (payload: OpenConfirmModal) => void;
  closeModal: (id?: string) => void;
  closeAll: () => void;
};
