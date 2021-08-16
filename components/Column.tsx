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
        {arr.map(item => <Square key={[id,item].join(',')} id={[id,item]}/>)}
        </div>
    )
}

export default Column
