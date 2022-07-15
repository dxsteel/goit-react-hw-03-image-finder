import { BallTriangle } from 'react-loader-spinner';
import styles from './Loader.module.css';

function Loader() {
  return (
    <div className={styles.loader}>
      <BallTriangle color="#ff096c" height={80} width={80} />
    </div>
  );
}
export default Loader;
