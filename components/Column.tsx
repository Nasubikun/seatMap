import { makeStyles } from '@material-ui/core'
import { useCallback } from 'react'
import React from 'react'
import Square from './Square'

const useStyles = makeStyles({
    columnRoot:{
        display:'flex',
        flexDirection:'column',
    }
})

const Column = ({Y,id}) => {
    const classes = useStyles();
    const arr = [...Array(Y)].map((_, i) => i)

    return (
        <div className={classes.columnRoot}>
        {arr.map(item => <Square id={[id,item]} isSeatProp={false}/>)}
        </div>
    )
}

export default Column
