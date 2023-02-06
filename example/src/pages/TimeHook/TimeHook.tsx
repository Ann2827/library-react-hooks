import React from 'react';
import styles from '../../assests/styles/page.module.scss';
import classNames from 'classnames';
import { ROUTE_MAIN } from '../../constants/routes';
import { openLink } from '../../utils/url';
import { useNavigate } from 'react-router-dom';

const TimeHook: React.VFC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page_wrapper}>
      <div className={styles.page_header}>
        <h2>Timer Hook</h2>
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
              openLink(`https://github.com/Ann2827/library-react-hooks/blob/main/src/hooks/timer/README.md`)
            }
          >
            Docs
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeHook;
