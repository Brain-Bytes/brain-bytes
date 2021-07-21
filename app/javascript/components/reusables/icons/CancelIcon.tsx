import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

type Props = {
  onClick: () => void,
  className: string,
};

const CancelIcon = (props: Props) => {
  const { onClick, className } = props;

  return (
    <FontAwesomeIcon className={`cursor-pointer ${className}`} icon={faTimes} onClick={onClick} />
  );
};

export default CancelIcon;
