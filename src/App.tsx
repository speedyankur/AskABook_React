import "@eon-ui/eon-ui-components/dist/eon-ui-components/eon-ui-components.css";
import Dictaphone from './components/Dictaphone/Dictaphone';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <Dictaphone />
    </div>
  );
}

export default App;
