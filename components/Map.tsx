import { Button, makeStyles } from '@material-ui/core'
import { useState,createContext, useEffect } from 'react'
import Row from './Row';
import useIncrement from '../hooks/useIncrement';
import Alert from '@material-ui/lab/Alert';
import { useContext } from 'react';
import dynamic from "next/dynamic";
import {useLocalStorage} from '../hooks/useLocalStorage'
import {MdChevronLeft,MdChevronRight,MdExpandLess,MdExpandMore} from 'react-icons/md'

const useStyles = makeStyles({
    mapRoot:{
        display:'flex',
        flexDirection:'column'
    },
    mapRowFlex:{
        display:'flex',
    },
    horizontalArrow:{
        width:'50px',
        height:'25px',
    },
    verticalArrow:{
        width:'25px',
        height:'50px'
    }
})

const IsEditingContext = createContext({});

export const useIsEditing = () =>{
    return useContext(IsEditingContext);
}
const Map = () => {
    const classes = useStyles();
    const [isEditing,setIsEditing] = useState(false);
    const [X,setX] = useState(Number(useLocalStorage("X",5)));
    const [Y,setY] = useState(Number(useLocalStorage("Y",4)));


    useEffect(() => {
        localStorage.setItem("X",String(X))
        localStorage.setItem("Y",String(Y))
    }, [X,Y])

    const incrementX = useIncrement(setX,1)
    const incrementY = useIncrement(setY,1)
    const decrementX = useIncrement(setX,-1)
    const decrementY = useIncrement(setY,-1)
    return (
        <IsEditingContext.Provider value={isEditing}>
        <div className={classes.mapRoot}>
            {isEditing&&<Alert severity="info">座席情報を編集中です</Alert>}
            <div className={classes.mapRowFlex}>
            <Row X={X} Y={Y}/>
            {isEditing&&<Button onClick={()=>decrementX()}><MdChevronLeft/></Button>}
            {isEditing&&<Button onClick={()=>incrementX()}><MdChevronRight/></Button>}
            </div>
            {isEditing&&<Button onClick={()=>decrementY()}><MdExpandLess/></Button>}
            {isEditing&&<Button onClick={()=>incrementY()}><MdExpandMore/></Button>}
            {isEditing?<Button variant="contained" color="secondary" onClick={()=>setIsEditing(false)}>完了</Button>:<Button variant="contained" color="primary" onClick={()=>setIsEditing(true)}>座席情報の編集</Button>}
        </div>
        </IsEditingContext.Provider>
    )
}

const DynamicMap = dynamic(
    {
      loader: async () => Map,
    },
    { ssr: false }
  );

export default DynamicMap
