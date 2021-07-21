import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

type Props = {
  onClick: () => void,
  className: string,
};

const ConfirmIcon = (props: Props) => {
  const { onClick, className } = props;

  return (
    <FontAwesomeIcon className={`cursor-pointer ${className}`} icon={faCheck} onClick={onClick} />
  );
};

export default ConfirmIcon;
