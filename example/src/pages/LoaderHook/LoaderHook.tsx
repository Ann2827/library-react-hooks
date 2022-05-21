import React from 'react';
import styles from '../../assests/styles/page.module.scss';
import { useLoader } from 'library-react-hooks';
import classNames from 'classnames';
import { ROUTE_MAIN } from '../../constants/routes';
import { useNavigate } from 'react-router-dom';
import { openLink } from '../../utils/url';

const LoaderHook: React.FC = () => {
  const navigate = useNavigate();
  const { loaderOn, loaderOff, loaderStop } = useLoader();

  return (
    <div className={styles.page_wrapper}>
      <div className={styles.page_header}>
        <h2>Loader Hook</h2>
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
              openLink(`https://github.com/Ann2827/library-react-hooks/blob/main/src/hooks/toast/README.md`)
            }
          >
            Docs
          </button>
        </div>
        <div className={classNames(styles.common_margin__xxl, styles.common_column)}>
          <h5>loaderOn</h5>
          <p className={classNames(styles.common_margin__l, styles.common_secondaryText)}>
            Loader start. Incremented (+1). You can click twice or more
          </p>
          <button
            className={classNames(
              styles.common_margin__l,
              styles.common_buttonPrimary,
              styles.common_buttonPrimary__outlined,
            )}
            onClick={() => loaderOn()}
          >
            Action
          </button>
        </div>
        <hr className={classNames(styles.common_divider, styles.common_margin__xl)} />
        <div className={classNames(styles.common_margin__xxl, styles.common_column)}>
          <h5>loaderOff</h5>
          <p className={classNames(styles.common_margin__l, styles.common_secondaryText)}>
            Loader cancel. Decremented (-1). You can click twice or more
          </p>
          <div className={styles.common_buttons}>
            <button
              className={classNames(styles.common_buttonPrimary, styles.common_buttonPrimary__outlined)}
              onClick={() => loaderOff()}
            >
              Action
            </button>
          </div>
        </div>
        <hr className={classNames(styles.common_divider, styles.common_margin__xl)} />
        <div className={classNames(styles.common_margin__xxl, styles.common_column)}>
          <h5>loaderStop</h5>
          <p className={classNames(styles.common_margin__l, styles.common_secondaryText)}>
            Loader stop. Resets all increments.
          </p>
          <div className={styles.common_buttons}>
            <button
              className={classNames(styles.common_buttonPrimary, styles.common_buttonPrimary__outlined)}
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
