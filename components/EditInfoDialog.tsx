import { Dialog,TextField,makeStyles } from '@material-ui/core'
import React from 'react'

const setValueToArray = (array,idx,value,setValue) =>{
    array[idx]=value;
    setValue(array)
}

const useStyles = makeStyles({
    dialogRoot:{
        display:'flex',
        flexDirection:"column",
    },
    numberField:{
        margin: "10px 5px",
    }
})

const mins2Secs = (mins) =>{
    return mins*60;
}

const secs2mins = (secs) =>{
    return Math.floor(secs/60);
}

const EditiInfoDialog = ({ onClose, open, chargeFee, setChargeFee}) => {
    const classes = useStyles();
    const handleClose = () => {
        onClose();
      };
    return (
        <Dialog className={classes.dialogRoot} onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <TextField id="firstTime" label="初回時間（分）" variant="outlined" type="number" onChange={(event) => setValueToArray(chargeFee,0,mins2Secs(Number(event.target.value)),setChargeFee)}　defaultValue={secs2mins(chargeFee[0])} />
            <TextField id="firstFee" label="初回料金（円）" variant="outlined" type="number" onChange={(event) => setValueToArray(chargeFee,1,Number(event.target.value),setChargeFee)} defaultValue={chargeFee[1]}/>
            <TextField id="additionalTime" label="延長時間（分）" variant="outlined" type="number" onChange={(event) => setValueToArray(chargeFee,2,mins2Secs(Number(event.target.value)),setChargeFee)} defaultValue={secs2mins(chargeFee[2])}/>
            <TextField id="additionalFee" label="延長料金（円）" variant="outlined" type="number" onChange={(event) => setValueToArray(chargeFee,3,Number(event.target.value),setChargeFee)} defaultValue={chargeFee[3]}/>
        </Dialog>
    )
}

export default EditiInfoDialog
