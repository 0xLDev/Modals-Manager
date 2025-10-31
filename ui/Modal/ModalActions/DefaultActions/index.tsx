import React from 'react';

import { isFilledString } from 'somePath';
import { Button } from 'somePath';
import { DEFAULT_BUTTON_LABEL } from '../../constants';

import type { OpenContentModal } from '../../../../types';
import './style.pcss';

export const DefaultModalActions = (props: OpenContentModal) => {
  const { labels = { buttonLabel: DEFAULT_BUTTON_LABEL }, onClose } = props;

  const handleCloseClick = (): void => {
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  return (
    <Button onClick={handleCloseClick} className={'ButtonClose'}>
      {isFilledString(labels.buttonLabel) ? labels.buttonLabel : DEFAULT_BUTTON_LABEL}
    </Button>
  );
};
