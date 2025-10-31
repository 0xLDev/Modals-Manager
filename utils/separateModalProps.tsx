import React from 'react';

import { DefaultModalActions } from '../ui/Modal/ModalActions';

import type { OpenContentModal } from '../types';

export const separateModalProps = (props: OpenContentModal) => {
  if (!props) {
    return { modalProps: {} };
  }

  const { labels, ...others } = props;

  return {
    modalProps: {
      ...(!props.modalFooter && { modalFooter: <DefaultModalActions {...props} /> }),
      ...others
    }
  };
};
