import { useContext } from 'react';

import { ModalsContext } from '../Context';

export const useModals = () => {
  const context = useContext(ModalsContext);

  if (!context) {
    throw new Error('useModals must be used within a ModalsProvider');
  }

  return context;
};
