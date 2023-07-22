import React, { useState } from 'react';
import { useEffectOnLoader } from 'library-react-hooks';
import styles from './Loader.module.scss';
import { ReactComponent as LoaderIcon } from '../../assests/icons/loader.svg';

const Loader: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  useEffectOnLoader((_e, s) => {
    setLoading(s.active);
  }, []);

  if (!loading) return null;
  return (
    <div className={styles.loader}>
      <LoaderIcon />
    </div>
  );
};

export default Loader;
