import { useParams, useNavigate } from 'react-router-dom';
import { ReceiptDetail } from './ReceiptDetail';

export const ReceiptDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) {
    return null;
  }

  const handleClose = () => {
    navigate('/sales/receipts');
  };

  return (
    <ReceiptDetail
      id={id}
      open={true}
      onClose={handleClose}
    />
  );
};

export default ReceiptDetailPage;
