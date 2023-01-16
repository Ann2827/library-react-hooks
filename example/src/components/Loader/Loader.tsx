import React, { useEffect, useState } from 'react';
import { useLoader } from 'library-react-hooks';
import styles from './Loader.module.scss';
import { ReactComponent as LoaderIcon } from '../../assests/icons/loader.svg';

const Loader: React.FC = () => {
  const { on } = useLoader();

  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    on((is) => setLoading(is));
    return () => on((_is) => {});
  }, [on]);

  if (!loading) return null;
  return (
    <div className={styles.loader}>
      <LoaderIcon />
    </div>
  );
};

export default Loader;
