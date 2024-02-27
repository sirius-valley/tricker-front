import React, { useState } from 'react';
import { Modal } from '@components/Modal/Modal';

export interface ModalRemoveProps {
  memberName: string;
  projectName: string;
  onRemove: () => void;
}

const ModalRemove: React.FC<ModalRemoveProps> = ({
  memberName,
  projectName,
  onRemove,
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => {setShowModal(true)}} className="text-white text-sm underline">
        Need help?
      </button>
      <Modal show={showModal} onClose={() => {setShowModal(false)}}>
        <div className="w-[400px] h-[400px] bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">
            Remove Member
          </h2>
          <p className="text-sm mb-4">
            Are you sure you want to remove {memberName} from {projectName}? This action cannot be undone.
          </p>
          <div className="flex justify-end">
          <button
              className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => {setShowModal(false)}}
            >
              Cancel
            </button>
            <button
              className="mr-4 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
              onClick={() => {
                onRemove();
              }}
            >
              Remove
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalRemove;
