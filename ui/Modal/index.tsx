import React from 'react';

import { DesktopModal } from './DesktopModal';
import { MobileModal } from './MobileModal';

import type { ModalProps } from '../../types';
import { useResolutions } from 'somePath';

export const Modal = (props: ModalProps) => {
  const { isDesktopResolution } = useResolutions();

  return isDesktopResolution ? <DesktopModal {...props} /> : <MobileModal {...props} />;
};
