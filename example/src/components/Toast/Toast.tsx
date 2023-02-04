import React, { useEffect, useState } from 'react';
import { useToast, ToastDataObject, toastSettings } from 'library-react-hooks';
import Notifications, { NotificationI } from './Notifications';

toastSettings({
  sticky: true,
  duplicate: false,
  limit: 5,
  types: {
    error: {
      title: 'Error',
      color: 'incorrect',
    },
    warning: {
      title: 'Warning',
      color: 'warning',
    },
    info: {
      title: 'Info',
      color: 'info',
    },
    success: {
      title: 'Success',
      color: 'correct',
    },
  },
});

const Toast = () => {
  const { on, clear } = useToast();

  const [messages, setMessages] = useState<NotificationI[]>([]);
  useEffect(() => {
    const clearListener = on((data: ToastDataObject[]) => {
      setMessages(
        data.map((item) => ({
          title: item.title || '',
          text: item.text || '',
          onClose: () => clear(item.id),
          color: item.color,
          actions: item.actions?.map((action) => ({ action: action.action, text: action.text || '' })),
        })),
      );
    });
    return () => clearListener();
  }, [on, clear]);

  if (!messages.length) return null;

  return <Notifications items={messages} />;
};

export default Toast;
