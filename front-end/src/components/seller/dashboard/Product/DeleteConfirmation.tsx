import React from "react";
interface DeleteConfirmationProps{
    onClose : ()=>void,
    onDelete: ()=>void
}
const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ onClose, onDelete }) => {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-4 rounded">
          <p>Are you sure you want to delete this product?</p>
          <div className="flex justify-end mt-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={onClose}>
              Cancel
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={onDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };
export default DeleteConfirmation;