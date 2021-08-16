import { makeStyles } from '@material-ui/core'
import React from 'react'
import Column from './Column'

const useStyles = makeStyles({
    rowRoot:{
        display:'flex',
        flexDirection:'row',
    }
})

const Row = ({X,Y}) => {
    const classes = useStyles();
    const arr = [...Array(X)].map((_, i) => i)

    return (
        <div className={classes.rowRoot}>
        {arr.map(item => <Column key={item} id={item} Y={Y}/>)}
        </div>
    )
}

export default Row
