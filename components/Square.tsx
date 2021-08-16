import { makeStyles } from '@material-ui/core';
import {useState,useEffect} from 'react'
import { useIsEditing } from './Map';
import {MdEventSeat,MdClose,MdPerson} from 'react-icons/md'
import SeatDialog from './SeatDialog';
import { useLocalStorage } from '../hooks/useLocalStorage';
import dynamic from "next/dynamic";


const useStyles = makeStyles(
    {squareRoot:{
        border: 'solid 1px #000000',
        width: '50px',
        height: '50px'
    }}
)


const calcElapsedTime = (time) =>{
    const ms = new Date().getTime() - time.getTime();
    const hours = Math.floor(ms / (1000*60*60));
    const mins = Math.floor(ms % (1000*60*60) / (1000*60));
    return String(hours)+":"+String(mins).padStart(2, '0');
}

const calcElapsedSecond = (time) =>{
    const ms = new Date().getTime() - time.getTime();
    const hours = Math.floor(ms / (1000*60*60));
    const mins = Math.floor(ms % (1000*60*60) / (1000*60));
    const secs = Math.floor(ms % (1000*60) / (1000));

    return String(hours)+"時間"+String(mins).padStart(2, '0')+'分'+String(secs).padStart(2, '0')+'秒';
}

const Square = ({id}) => {
    const classes = useStyles();

    // 座席が存在するか
    const [isSeat, setIsSeat] = useState(useLocalStorage("isSeat"+String(id),false));
    
    // ダイアログの表示切替
    const [open, setOpen] = useState(false);

    // お客さんの入店時間（空席の場合はnull）
    const [enteringTime,setEnteringTime] = useState(null);

    const [selectedValue, setSelectedValue] = useState("test");

    const [count,setCount] = useState(0);

    // 座席情報編集モードか
    const isEditing =useIsEditing();

    useEffect(() => {
        const interval = setInterval(() => {
          setCount(c => c + 1);
        }, 10000);
        return () => clearInterval(interval);
      }, []);

    useEffect(() => {
        localStorage.setItem("isSeat"+String(id),isSeat)
    }, [isSeat])
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (value) => {
      setOpen(false);
      setSelectedValue(value);
    };

    const handleSeatClick = () =>{
        if(isEditing){
            setIsSeat(!isSeat)
        }else{
            handleClickOpen()
        }
    }

    const handleEnter = () =>{
        setEnteringTime(new Date())
    }

    const handleExit = () =>{
        alert(`滞在時間は${parseEnteringTimeAsSecond(enteringTime)}でした。`)
        setEnteringTime(null)
    }

    const parseEnteringTime = (enteringTime) =>{
        if(enteringTime){
            return calcElapsedTime(enteringTime)
        }else{
            return ''
        }
    }

    const parseEnteringTimeAsSecond = (enteringTime) =>{
        if(enteringTime){
            return calcElapsedSecond(enteringTime)
        }else{
            return ''
        }
    }


    return (
        isSeat?<div id={id}><div className={classes.squareRoot} onClick={()=>handleSeatClick()}>
            {enteringTime?<MdPerson/>:<MdEventSeat/>}
            <div>{parseEnteringTime(enteringTime)||"空席"}</div>
        </div>
        <SeatDialog selectedValue={selectedValue} open={open} onClose={handleClose} handleEnter={handleEnter} handleExit={handleExit} enteringTime={enteringTime} elapsedTime={parseEnteringTime(enteringTime)}/>
        </div>
        :
        <div id={id} className={classes.squareRoot} onClick={()=>handleSeatClick()}>
            {isEditing&&<MdClose/>}
        </div>
    )
}

const DynamicSquare = dynamic(
    {
      loader: async () => Square,
    },
    { ssr: false }
  );

export default DynamicSquare
