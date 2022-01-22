import React from 'react';
import classes from './Notifications.module.scss';
import type { NotificationsI } from './Notifications.types';
import Notification from './Notification';

const Notifications: React.FC<NotificationsI> = ({ items }: NotificationsI) => {
  return (
    <div className={classes.wrapper}>
      {items.map((item, id) => (
        <Notification key={id} {...item} />
      ))}
    </div>
  );
};

export default Notifications;
