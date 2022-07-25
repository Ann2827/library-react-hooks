import React, { useCallback, useEffect, useState } from 'react';
import apiInit from '../../api';
import { useHttp } from 'library-react-hooks';
import { AnswerGetUsers } from '../../api/answer.types';
import styles from '../../assests/styles/page.module.scss';
import classNames from 'classnames';
import { ROUTE_MAIN } from '../../constants/routes';
import { openLink } from '../../utils/url';
import { useNavigate } from 'react-router-dom';

apiInit();

const HttpHook: React.FC = () => {
  const navigate = useNavigate();
  const { requestByName, ready } = useHttp();

  const [users, setUsers] = useState<Exclude<AnswerGetUsers | null, boolean | undefined>>(null);

  const getUsers = useCallback(async () => {
    const fetched = await requestByName('getUsers');
    if (typeof fetched === 'object') setUsers(fetched);
  }, [requestByName]);
  useEffect(() => {
    if (ready('getUsers')) {
      getUsers();
    }
  }, [getUsers, ready]);

  console.log('users', users);

  return (
    <div className={styles.page_wrapper}>
      <div className={styles.page_header}>
        <h2>Http Hook</h2>
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
              openLink(`https://github.com/Ann2827/library-react-hooks/blob/main/src/hooks/http/README.md`)
            }
          >
            Docs
          </button>
        </div>
        {/*<div className={classNames(styles.common_margin__xxl, styles.common_column)}>*/}
        {/*  <h5>loaderOn</h5>*/}
        {/*  <p className={classNames(styles.common_margin__l, styles.common_secondaryText)}>*/}
        {/*    Loader start. Incremented (+1). You can click twice or more*/}
        {/*  </p>*/}
        {/*  <button*/}
        {/*    className={classNames(*/}
        {/*      styles.common_margin__l,*/}
        {/*      styles.common_buttonPrimary,*/}
        {/*      styles.common_buttonPrimary__outlined,*/}
        {/*    )}*/}
        {/*    onClick={() => {}}*/}
        {/*  >*/}
        {/*    Action*/}
        {/*  </button>*/}
        {/*</div>*/}
      </div>
    </div>
  );
};

export default HttpHook;
