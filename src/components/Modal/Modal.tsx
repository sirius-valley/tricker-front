import React, { type ReactNode } from 'react'
import ReactDom from 'react-dom'

interface ModalProps {
  show: boolean
  onClose: () => void
  children: ReactNode
}

export const Modal = ({
  show,
  onClose,
  children
}: ModalProps): JSX.Element | null => {
  const handleClose = (event: React.MouseEvent): void => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  const portalElement = document.getElementById('portal')
  if (!portalElement || !show) {
    return null
  } else {
    return ReactDom.createPortal(
      <>
        {show && (
          <div
            onClick={handleClose}
            className="w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
          >
            {children}
          </div>
        )}
      </>,
      portalElement
    )
  }
}

/*
Example usage:
          const [ showModal, setShowModal ] = useState(false)
          
          <button onClick={() => {setShowModal(true)}} className="text-white text-sm underline">Need help?</button>
          <Modal show={showModal} onClose={() => {setShowModal(false)}}>
            <div className="w-[400px] h-[400px] bg-white">
              <h1>Modal Content</h1>
              <p>Modal content goes here</p>
              <button onClick={() => {setShowModal(false)}}>Close Modal</button>
            </div>
          </Modal>
*/
