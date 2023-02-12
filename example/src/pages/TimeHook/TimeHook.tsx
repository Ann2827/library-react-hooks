import React, { useCallback } from 'react';
import styles from '../../assests/styles/page.module.scss';
import classNames from 'classnames';
import { ROUTE_MAIN } from '../../constants/routes';
import { openLink } from '../../utils/url';
import { useNavigate } from 'react-router-dom';
import { useTimer, useListenTime } from 'library-react-hooks';

const TimeHook: React.VFC = () => {
  const navigate = useNavigate();
  const { setTimer } = useTimer();
  const time = useListenTime();
  console.log('time', time.timer2);

  const clickHandle = useCallback(() => {
    setTimer(10, { name: 'timer2', observe: true, listen: true });
  }, [setTimer]);

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

        <div className={classNames(styles.common_margin__xxl, styles.common_column)}>
          <h5>setTimer</h5>
          {/* <p className={classNames(styles.common_margin__l, styles.common_secondaryText)}> */}
          {/*  Loader start. Incremented (+1). You can click twice or more */}
          {/* </p> */}
          <button
            className={classNames(
              styles.common_margin__l,
              styles.common_buttonPrimary,
              styles.common_buttonPrimary__outlined,
            )}
            onClick={() =>
              setTimer(10, {
                name: 'setTimer',
                callback: () => {
                  console.log('finish');
                },
                autoFinish: true,
              })
            }
          >
            Action
          </button>
          <button
            className={classNames(
              styles.common_margin__l,
              styles.common_buttonPrimary,
              styles.common_buttonPrimary__outlined,
            )}
            onClick={clickHandle}
          >
            Action
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeHook;
