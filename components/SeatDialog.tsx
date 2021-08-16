import { Dialog, DialogTitle, Button, Typography } from '@material-ui/core'
import React from 'react'

const SeatDialog = ({ onClose, open, handleEnter, handleExit, enteringTime, elapsedTime }) => {
    const handleClose = () => {
        onClose();
      };
    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle>座席情報</DialogTitle>
            <Typography>経過時間{elapsedTime}</Typography>
            {enteringTime?<Button onClick={()=>handleExit()}>退店</Button>:<Button onClick={()=>handleEnter()}>着席を記録</Button>}
        </Dialog>
    )
}

export default SeatDialog
