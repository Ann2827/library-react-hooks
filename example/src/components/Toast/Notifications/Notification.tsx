import React from 'react';
import styles from './Notifications.module.scss';
import type { NotificationI } from './Notifications.types';
import { ReactComponent as CrossIcon } from '../../../assests/icons/cross.svg';
import classNames from 'classnames';

const Notification: React.FC<NotificationI> = ({ title, text, onClose, color, actions }: NotificationI) => {
  const titleStyle = classNames({
    [styles[`title_${color}`]]: color,
  });

  return (
    <div className={styles.notification}>
      <div className={styles.close} onClick={onClose}>
        <CrossIcon />
      </div>
      <div className={styles.content}>
        <h5 className={titleStyle}>{title}</h5>
        <p>{text}</p>
        {!!actions?.length && (
          <div className={styles.actions}>
            {actions.map((item, id) => (
              <button key={id} onClick={() => item.action()} className={styles.buttonSecondary}>
                {item.text}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
