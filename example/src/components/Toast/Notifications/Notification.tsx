import React from 'react';
import styles from './Notifications.module.scss';
import type { NotificationI } from './Notifications.types';

const Notification: React.FC<NotificationI> = ({ title, text, onClose }: NotificationI) => {
  return (
    <div className={styles.notification}>
      <div className={styles.close} onClick={onClose}>
        x
      </div>
      <div className={styles.content}>
        <h5>{title}</h5>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Notification;
