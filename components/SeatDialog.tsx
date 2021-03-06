import { Dialog, DialogTitle, Button, Typography } from '@material-ui/core'
import React from 'react'

const SeatDialog = ({ onClose, open, handleEnter, handleExit, enteringTime, elapsedTime, chargeFee }) => {
    const handleClose = () => {
        onClose();
      };
    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle>座席情報</DialogTitle>
            {elapsedTime?<Typography>経過時間 {elapsedTime}</Typography>:<Typography>空席です。</Typography>}
            {chargeFee&&<Typography>現在のチャージ料金 {chargeFee}円</Typography>}
            {enteringTime?<Button variant='contained' color='secondary' onClick={()=>handleExit()}>退店</Button>:<Button variant="contained" color="primary" onClick={()=>handleEnter()}>着席を記録</Button>}
        </Dialog>
    )
}

export default SeatDialog
