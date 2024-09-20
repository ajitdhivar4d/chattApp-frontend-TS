interface ConfirmDeleteDialogProps {
  open: boolean;
  handleClose: () => void;
  deleteHandler: () => void;
}

const ConfirmDeleteDialog = ({ open, handleClose, deleteHandler }: ConfirmDeleteDialogProps) => {
  if (!open) return null;

  return (
    <div className="confirmDeleteDialog-overlay">
      <div className="confirmDeleteDialog-container">
        <h2 className="confirmDeleteDialog-title">Confirm Delete</h2>
        <div className="confirmDeleteDialog-content">
          <p>Are you sure you want to delete this group?</p>
        </div>
        <div className="confirmDeleteDialog-actions">
          <button onClick={handleClose} className="confirmDeleteDialog-button">
            No
          </button>
          <button onClick={deleteHandler} className="confirmDeleteDialog-button confirmDeleteDialog-button-error">
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteDialog;
