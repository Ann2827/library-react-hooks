import React, { useEffect } from "react";
import styles from '../../assests/styles/page.module.scss';
import { useToast } from 'library-react-hooks';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { ROUTE_MAIN } from '../../constants/routes';
import { openLink } from '../../utils/url';
import { useTranslation } from 'react-i18next';

const ToastHook: React.FC = () => {
  const navigate = useNavigate();
  const { alert, setTypes, setTranslationFn } = useToast();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setTranslationFn(t);
  }, [setTranslationFn, t]);

  return (
    <div className={styles.page_wrapper}>
      <div className={styles.page_header}>
        <h2>Toast Hook</h2>
      </div>
      <div className={styles.page_content}>
        <div className={styles.common_buttons}>
          <button
            className={classNames(styles.common_buttonSecondary, styles.common_buttonSecondary__outlined)}
            onClick={() => navigate(ROUTE_MAIN)}
          >
            Back
          </button>
          <button
            className={classNames(styles.common_buttonSecondary, styles.common_buttonSecondary__outlined)}
            onClick={() =>
              openLink(`https://github.com/Ann2827/library-react-hooks/blob/main/src/hooks/loader/README.md`)
            }
          >
            Docs
          </button>
        </div>
        <div className={classNames(styles.common_margin__xxl, styles.common_column)}>
          <h4>toastSettings:</h4>
          <div className={styles.common_margin__m}>
            <p className={styles.common_secondaryText}>The settings are set once. Properties:</p>
            <ul className={styles.common_list}>
              <li>sticky - true</li>
              <li className={styles.common_listItem}>duplicate - false</li>
              <li className={styles.common_listItem}>limit - 5</li>
              <li className={styles.common_listItem}>types:</li>
              <ul>
                <li>error: title - Error, color: incorrect</li>
                <li className={styles.common_listItem}>warning: title - Warning, color: warning</li>
                <li className={styles.common_listItem}>success: title - Success, color: correct</li>
                <li className={styles.common_listItem}>info: title - Info, color: info</li>
              </ul>
            </ul>
          </div>
        </div>
        <hr className={classNames(styles.common_margin__xl, styles.common_divider)} />
        <div className={classNames(styles.common_margin__xxl, styles.common_column)}>
          <h5>Error</h5>
          <div className={styles.common_margin__m}>
            <p className={styles.common_secondaryText}>Error message. Alert properties:</p>
            <ul className={styles.common_list}>
              <li>text - Some error message.</li>
              <li className={styles.common_listItem}>type - error</li>
            </ul>
          </div>
          <div className={styles.common_buttons}>
            <button
              className={classNames(
                styles.common_buttonPrimary,
                styles.common_buttonPrimary__outlined,
                styles.common_margin__m,
              )}
              onClick={() => alert({ text: 'Some error message.', type: 'error' })}
            >
              Demo
            </button>
            <button
              className={classNames(
                styles.common_buttonPrimary,
                styles.common_buttonPrimary__outlined,
                styles.common_margin__m,
              )}
              onClick={() => setTypes({ error: { title: 'Dynamic title' } })}
            >
              Change title
            </button>
          </div>
        </div>
        <hr className={classNames(styles.common_margin__xl, styles.common_divider)} />
        <div className={classNames(styles.common_margin__xxl, styles.common_column)}>
          <h5>Warning & No Duplicate</h5>
          <div className={styles.common_margin__m}>
            <p className={styles.common_secondaryText}>Warning message without duplication. Alert properties:</p>
            <ul className={styles.common_list}>
              <li>text - Some warning message.</li>
              <li className={styles.common_listItem}>type - warning</li>
              <li className={styles.common_listItem}>tag - tag1</li>
            </ul>
          </div>
          <button
            className={classNames(
              styles.common_buttonPrimary,
              styles.common_buttonPrimary__outlined,
              styles.common_margin__m,
            )}
            onClick={() => alert({ text: 'Some warning message.', type: 'warning', tag: 'tag1' })}
          >
            Demo
          </button>
        </div>
        <hr className={classNames(styles.common_margin__xl, styles.common_divider)} />
        <div className={classNames(styles.common_margin__xxl, styles.common_column)}>
          <h5>Success & Duration</h5>
          <div className={styles.common_margin__m}>
            <p className={styles.common_secondaryText}>Success message with duration. Alert properties:</p>
            <ul className={styles.common_list}>
              <li>text - Some success message.</li>
              <li className={styles.common_listItem}>type - success</li>
              <li className={styles.common_listItem}>duration - 3000</li>
              <li className={styles.common_listItem}>sticky - false</li>
            </ul>
          </div>
          <button
            className={classNames(
              styles.common_buttonPrimary,
              styles.common_buttonPrimary__outlined,
              styles.common_margin__m,
            )}
            onClick={() => alert({ text: 'Some success message.', type: 'success', duration: 3000, sticky: false })}
          >
            Demo
          </button>
        </div>
        <hr className={classNames(styles.common_margin__xl, styles.common_divider)} />
        <div className={classNames(styles.common_margin__xxl, styles.common_column)}>
          <h5>Info & Actions</h5>
          <div className={styles.common_margin__m}>
            <p className={styles.common_secondaryText}>Info message with buttons. Alert properties:</p>
            <ul className={styles.common_list}>
              <li>text - Some info message.</li>
              <li className={styles.common_listItem}>type - info</li>
              <li className={styles.common_listItem}>actions:</li>
              <ul>
                <li>text - I agree, action - nothing</li>
              </ul>
            </ul>
          </div>
          <button
            className={classNames(
              styles.common_buttonPrimary,
              styles.common_buttonPrimary__outlined,
              styles.common_margin__m,
            )}
            onClick={() =>
              alert({ text: 'Some info message.', type: 'info', actions: [{ text: 'I agree', action: () => {} }] })
            }
          >
            Demo
          </button>
        </div>
        <hr className={classNames(styles.common_margin__xl, styles.common_divider)} />
        <div className={classNames(styles.common_margin__xxl, styles.common_column)}>
          <h5>Translation Fn</h5>
          <div className={styles.common_margin__m}>
            <p className={styles.common_secondaryText}>Dynamic translation with help i18next:</p>
            <p className={styles.common_secondaryText}>Current lang: <b>{i18n.language}</b></p>
          </div>
          <div className={styles.common_buttons}>
            <button
              className={classNames(
                styles.common_buttonPrimary,
                styles.common_buttonPrimary__outlined,
                styles.common_margin__m,
              )}
              onClick={() =>
                alert({ titleData: { key: 'message.title' }, textData: { key: 'message.text', options: { type: 'type.info' } }, type: 'info', actions: [{ text: '', actionData: { key: 'message.button' }, action: () => {} }] })
              }
            >
              Alert
            </button>
            <button
              className={classNames(
                styles.common_buttonPrimary,
                styles.common_buttonPrimary__outlined,
                styles.common_margin__m,
              )}
              onClick={() => i18n.changeLanguage('ru')}
            >
              Switch ru
            </button>
            <button
              className={classNames(
                styles.common_buttonPrimary,
                styles.common_buttonPrimary__outlined,
                styles.common_margin__m,
              )}
              onClick={() => i18n.changeLanguage('en')}
            >
              Switch en
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToastHook;
