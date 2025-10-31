import { createUseExternalEvents } from './lib/createUseExternalEvents';

import type { ModalsEvents } from './types';

export const [useModalsEvents, createEvent] = createUseExternalEvents<ModalsEvents>('app-modals');

export const openModal = createEvent('openModal');
export const openConfirmModal = createEvent('openConfirmModal');
export const closeModal = createEvent('closeModal');
export const closeAll = createEvent('closeAll');

export const modals: {
  openModal: ModalsEvents['openModal'];
  openConfirmModal: ModalsEvents['openConfirmModal'];
  closeModal: ModalsEvents['closeModal'];
  closeAll: ModalsEvents['closeAll'];
} = {
  openModal,
  openConfirmModal,
  closeModal,
  closeAll
};
