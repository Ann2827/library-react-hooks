import React from 'react';
import styles from '../../assests/styles/pages.module.scss';
import { useLoader } from 'library-react-hooks';
import classNames from 'classnames';
import { ROUTE_LOADER, ROUTE_MAIN } from '../../constants/routes';
import { useNavigate } from 'react-router-dom';
import { openLink } from '../../utils/url';

const LoaderHook: React.FC = () => {
  const navigate = useNavigate();
  const { loaderOn, loaderOff, loaderStop } = useLoader();

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h2>Loader Hook</h2>
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
            onClick={() => openLink(`https://ann2827.github.io/library-react-hooks/${ROUTE_LOADER}`)}
          >
            Docs
          </button>
        </div>
        <div className={styles.pageBlock}>
          <h5>loaderOn</h5>
          <p className={styles.secondaryText}>Loader start. Incremented (+1). You can click twice or more</p>
          <button className={classNames(styles.buttonPrimary, { [styles.outlined]: true })} onClick={() => loaderOn()}>
            Action
          </button>
        </div>
        <hr className={styles.divider} />
        <div className={styles.pageBlock}>
          <h5>loaderOff</h5>
          <p className={styles.secondaryText}>Loader cancel. Decremented (-1). You can click twice or more</p>
          <div className={styles.buttons}>
            <button
              className={classNames(styles.buttonPrimary, { [styles.outlined]: true })}
              onClick={() => loaderOff()}
            >
              Action
            </button>
          </div>
        </div>
        <hr className={styles.divider} />
        <div className={styles.pageBlock}>
          <h5>loaderStop</h5>
          <p className={styles.secondaryText}>Loader stop. Resets all increments.</p>
          <div className={styles.buttons}>
            <button
              className={classNames(styles.buttonPrimary, { [styles.outlined]: true })}
              onClick={() => loaderStop()}
            >
              Action
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoaderHook;
