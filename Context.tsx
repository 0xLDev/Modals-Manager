import { createContext } from 'react';

import type { ModalsContextProps } from './types';

export const ModalsContext = createContext<ModalsContextProps | null>(null);
