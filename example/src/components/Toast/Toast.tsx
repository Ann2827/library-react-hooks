import React, { useEffect, useState } from 'react';
import { useToast, ToastDataObject, toastSettings } from 'library-react-hooks';
import Notifications, { NotificationI } from './Notifications';

toastSettings({
  sticky: true,
  duplicate: false,
  types: {
    error: {
      title: 'Error',
    },
    warning: {
      title: 'Warning',
    },
    info: {
      title: 'Info',
    },
    success: {
      title: 'Success',
    },
  },
});

const Toast = () => {
  const { on, clear } = useToast();

  const [messages, setMessages] = useState<NotificationI[]>([]);
  useEffect(() => {
    on((data: ToastDataObject[]) => {
      console.log('data', data);
      setMessages(
        data.map((item) => ({
          title: item.title || '',
          text: item.text,
          onClose: () => clear(item.id),
        })),
      );
    });
  }, [on, clear]);

  if (!messages.length) return null;

  return <Notifications items={messages} />;
};

export default Toast;
