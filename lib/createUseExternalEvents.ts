import { useLayoutEffect } from 'react';

const dispatchEvent = <T>(type: string, detail?: T) => {
  window.dispatchEvent(new CustomEvent(type, { detail }));
};

export const createUseExternalEvents = <Handlers extends Record<string, (detail: any) => void>>(prefix: string) => {
  const useExternalEvents = (events: Handlers) => {
    const handlers = Object.entries(events).reduce<Record<string, (event: CustomEvent) => void>>(
      (acc, [eventKey, handler]) => {
        const eventName = `${prefix}:${String(eventKey)}`;

        acc[eventName] = (event: CustomEvent) => {
          handler(event.detail);
        };

        return acc;
      },
      {}
    );

    useLayoutEffect(() => {
      Object.entries(handlers).forEach(([eventKey, handler]) => {
        window.addEventListener(eventKey, handler as EventListener);
        return () => window.removeEventListener(eventKey, handler as EventListener);
      });

      return () => {
        Object.entries(handlers).forEach(([eventKey, handler]) => {
          window.removeEventListener(eventKey, handler as EventListener);
        });
      };
    }, [handlers]);
  };

  const createEvent = <EventKey extends Extract<keyof Handlers, string>>(event: EventKey) => {
    type Parameter = Parameters<Handlers[EventKey]>[0];

    return (...payload: Parameter extends undefined ? [undefined?] : [Parameter]) =>
      dispatchEvent(`${prefix}:${String(event)}`, payload[0]);
  };

  return [useExternalEvents, createEvent] as const;
};
