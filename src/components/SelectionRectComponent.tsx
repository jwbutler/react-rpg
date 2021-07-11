import Rect from '../types/Rect';
import styles from './SelectionRectComponent.module.css';

type Props = {
  rect: Rect
};

const SelectionRectComponent = ({ rect }: Props) => {
  const style = {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height
  };
  return (
    <div
      className={styles.rect}
      style={style}
    />
  );
}

export default SelectionRectComponent;
