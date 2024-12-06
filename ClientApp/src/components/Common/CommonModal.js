import React from 'react'
import { Button, Modal } from 'react-bootstrap'

function CommonModal({ show, handleClose, title,handleChange, body,children }) {
   

  return (
    
    <div>
        
      <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton className='bg-#c0c2c5-500'>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}{children}</Modal.Body>
            {/* <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer> */}
        </Modal>
    </div>
  )
}

export default CommonModal
