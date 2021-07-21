import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

type Props = {
  onClick: () => void,
  className: string,
};

const DeleteIcon = (props: Props) => {
  const { onClick, className } = props;

  return (
    <FontAwesomeIcon className={`cursor-pointer ${className}`} icon={faTrashAlt} onClick={onClick} />
  );
};

export default DeleteIcon;
