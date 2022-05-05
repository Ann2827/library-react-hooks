import React from 'react';
import styles from '../../assests/styles/pages.module.scss';
import { useToast } from 'library-react-hooks';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { ROUTE_MAIN } from '../../constants/routes';
import { openLink } from '../../utils/url';

const ToastHook: React.FC = () => {
  const navigate = useNavigate();
  const { alert } = useToast();

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h2>Toast Hook</h2>
      </div>
      <div className={styles.pageContent}>
        <div className={styles.buttons}>
          <button
            className={classNames(styles.buttonSecondary, { [styles.outlined]: true })}
            onClick={() => navigate(ROUTE_MAIN)}
          >
            To main
          </button>
          <button
            className={classNames(styles.buttonSecondary, { [styles.outlined]: true })}
            onClick={() =>
              openLink(`https://github.com/Ann2827/library-react-hooks/blob/main/src/hooks/loader/README.md`)
            }
          >
            Docs
          </button>
        </div>
        <div className={styles.pageBlock}>
          <h4>toastSettings:</h4>
          <div>
            <p className={styles.secondaryText}>The settings are set once. Properties:</p>
            <ul className={styles.list}>
              <li>sticky - true</li>
              <li>duplicate - false</li>
              <li>types:</li>
              <ul>
                <li>error: title - Error, color: incorrect</li>
                <li>warning: title - Warning, color: warning</li>
                <li>success: title - Success, color: correct</li>
                <li>info: title - Info, color: info</li>
              </ul>
            </ul>
          </div>
        </div>
        <hr className={styles.divider} />
        <div className={styles.pageBlock}>
          <h5>Error</h5>
          <div>
            <p className={styles.secondaryText}>Error message. Alert properties:</p>
            <ul className={styles.list}>
              <li>text - Some error message.</li>
              <li>type - error</li>
            </ul>
          </div>
          <button
            className={classNames(styles.buttonPrimary, { [styles.outlined]: true })}
            onClick={() => alert({ text: 'Some error message.', type: 'error' })}
          >
            Demo
          </button>
        </div>
        <hr className={styles.divider} />
        <div className={styles.pageBlock}>
          <h5>Warning & No Duplicate</h5>
          <div>
            <p className={styles.secondaryText}>Warning message without duplication. Alert properties:</p>
            <ul className={styles.list}>
              <li>text - Some warning message.</li>
              <li>type - warning</li>
              <li>tag - tag1</li>
            </ul>
          </div>
          <button
            className={classNames(styles.buttonPrimary, { [styles.outlined]: true })}
            onClick={() => alert({ text: 'Some warning message.', type: 'warning', tag: 'tag1' })}
          >
            Demo
          </button>
        </div>
        <hr className={styles.divider} />
        <div className={styles.pageBlock}>
          <h5>Success & Duration</h5>
          <div>
            <p className={styles.secondaryText}>Success message with duration. Alert properties:</p>
            <ul className={styles.list}>
              <li>text - Some success message.</li>
              <li>type - success</li>
              <li>duration - 3000</li>
              <li>sticky - false</li>
            </ul>
          </div>
          <button
            className={classNames(styles.buttonPrimary, { [styles.outlined]: true })}
            onClick={() => alert({ text: 'Some success message.', type: 'success', duration: 3000, sticky: false })}
          >
            Demo
          </button>
        </div>
        <hr className={styles.divider} />
        <div className={styles.pageBlock}>
          <h5>Info & Actions</h5>
          <div>
            <p className={styles.secondaryText}>Info message with buttons. Alert properties:</p>
            <ul className={styles.list}>
              <li>text - Some info message.</li>
              <li>type - info</li>
              <li>actions:</li>
              <ul>
                <li>text - I agree, action - nothing</li>
              </ul>
            </ul>
          </div>
          <button
            className={classNames(styles.buttonPrimary, { [styles.outlined]: true })}
            onClick={() =>
              alert({ text: 'Some info message.', type: 'info', actions: [{ text: 'I agree', action: () => {} }] })
            }
          >
            Demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToastHook;
