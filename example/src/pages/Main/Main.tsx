import React, { useCallback } from 'react';
import { useToast, useLoader } from 'library-react-hooks';
import styles from '../../assests/styles/pages.module.scss';
import classNames from 'classnames';
import { ReactComponent as ArrowRightIcon } from '../../assests/icons/arrowRight.svg';
import { useNavigate } from 'react-router-dom';
import { ROUTE_FULL_LOADER, ROUTE_FULL_TOAST } from '../../constants/routes';
import { openLink } from '../../utils/url';

const ToastDemo: React.FC = () => {
  const { alert } = useToast();
  const navigate = useNavigate();

  return (
    <div className={styles.pageBlock}>
      <h5>Toast Hook</h5>
      <div className={styles.buttons}>
        <button
          className={classNames(styles.buttonPrimary, { [styles.outlined]: true })}
          onClick={() => alert({ text: 'Some error message.', type: 'error', tag: 'error1' })}
        >
          Show
        </button>
        <button className={styles.buttonPrimary} onClick={() => navigate(ROUTE_FULL_TOAST)}>
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
};

const LoaderDemo: React.FC = () => {
  const { loaderOn, loaderStop } = useLoader();
  const navigate = useNavigate();

  const clickHandle = useCallback(() => {
    loaderOn();
    setTimeout(() => loaderStop(), 3000);
  }, [loaderOn, loaderStop]);

  return (
    <div className={styles.pageBlock}>
      <h5>Loader Hook</h5>
      <div className={styles.buttons}>
        <button className={classNames(styles.buttonPrimary, { [styles.outlined]: true })} onClick={clickHandle}>
          Show
        </button>
        <button className={styles.buttonPrimary} onClick={() => navigate(ROUTE_FULL_LOADER)}>
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
};

const Main: React.FC = () => {
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h2>Hooks Demo</h2>
      </div>
      <div className={styles.pageContent}>
        <button
          className={classNames(styles.buttonSecondary, { [styles.outlined]: true })}
          onClick={() => openLink(`https://github.com/Ann2827/library-react-hooks/blob/main/README.md`)}
        >
          Docs
        </button>
        <ToastDemo />
        <LoaderDemo />
      </div>
    </div>
  );
};

export default Main;
