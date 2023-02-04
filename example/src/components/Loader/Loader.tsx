import React, { useEffect, useState } from 'react';
import { useLoader } from 'library-react-hooks';
import styles from './Loader.module.scss';
import { ReactComponent as LoaderIcon } from '../../assests/icons/loader.svg';

const Loader: React.FC = () => {
  const { on } = useLoader();

  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const clearListener = on((is) => setLoading(is));
    return () => clearListener();
  }, [on]);

  if (!loading) return null;
  return (
    <div className={styles.loader}>
      <LoaderIcon />
    </div>
  );
};

export default Loader;
