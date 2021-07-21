import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenAlt } from '@fortawesome/free-solid-svg-icons';

type Props = {
  onClick: () => void,
  className: string,
};

const EditIcon = (props: Props) => {
  const { onClick, className } = props;

  return (
    <FontAwesomeIcon className={`cursor-pointer ${className}`} icon={faPenAlt} onClick={onClick} />
  );
};

export default EditIcon;
