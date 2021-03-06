import { makeStyles } from '@material-ui/core';
import {useState,useEffect} from 'react'
import { useIsEditing } from './Map';
import {MdEventSeat,MdClose,MdPerson} from 'react-icons/md'
import SeatDialog from './SeatDialog';
import { useLocalStorage } from '../hooks/useLocalStorage';
import dynamic from "next/dynamic";
import { useChargeFee } from './General';


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
    const secs = Math.floor(ms % (1000*60) / (1000));

    return [hours,mins,secs,ms]
}

const parseElaspedTimeAsMin = (time) =>{
    const [hours,mins,secs,ms] = calcElapsedTime(time)
    return String(hours)+":"+String(mins).padStart(2, '0');
}

const parseElaspedTimeAsSec = (time) =>{
    const [hours,mins,secs,ms] = calcElapsedTime(time)
    return String(hours)+"時間"+String(mins).padStart(2, '0')+'分'+String(secs).padStart(2, '0')+'秒';
}

const calcChargeFee = (time,firstTime,firstFee,additionalTime,additionalFee) =>{
    if(time){
        const diffAsSec = (new Date().getTime() - time.getTime())/1000;
        if (diffAsSec - firstTime<0){
            return firstFee
        }else{
            console.log(firstFee+(Math.ceil((diffAsSec - firstTime)/additionalTime)*additionalFee))
            console.log(Math.ceil((diffAsSec - firstTime)/additionalTime))
            console.log({diffAsSec})
            console.log({firstTime})
            console.log({additionalTime})
            console.log({additionalFee})
            console.log(firstFee)
            console.log((Math.ceil((diffAsSec - firstTime)/additionalTime)*additionalFee))
            return firstFee+(Math.ceil((diffAsSec - firstTime)/additionalTime)*additionalFee)
        }
    }else{
        return null
    }
}

const Square = ({id}) => {
    const classes = useStyles();

    // 座席が存在するか
    const [isSeat, setIsSeat] = useState(useLocalStorage("isSeat"+String(id),false));
    
    // ダイアログの表示切替
    const [open, setOpen] = useState(false);

    const tryTimeParse = (strTime) =>{
        if(strTime){
            console.log(new Date(strTime))
            return new Date(strTime)
        }else{
            return null
        }
    }

    // お客さんの入店時間（空席の場合はnull）
    const [enteringTime,setEnteringTime] = useState(tryTimeParse(useLocalStorage("enteringTime"+String(id),null)));

    console.log(enteringTime)

    const [count,setCount] = useState(0);

    // 座席情報編集モードか
    const isEditing =useIsEditing();

    const [firstTime,firstFee,additionalTime,additionalFee] = useChargeFee()

    useEffect(() => {
        const interval = setInterval(() => {
          setCount(c => c + 1);
        }, 10000);
        return () => clearInterval(interval);
      }, []);

    useEffect(() => {
        localStorage.setItem("isSeat"+String(id),isSeat)
    }, [isSeat])


    useEffect(() => {
        localStorage.setItem("enteringTime"+String(id),JSON.stringify(enteringTime))
    }, [enteringTime])

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleSeatClick = () =>{
        if(isEditing){
            setIsSeat(!isSeat)
        }else{
            handleClickOpen()
        }
    }

    const handleEnter = () =>{
        setOpen(false);

        setEnteringTime(new Date());
    }

    const handleExit = () =>{
        setOpen(false);
        alert(`滞在時間は${parseEnteringTimeAsSecond(enteringTime)}でした。チャージ料金は${calcChargeFee(enteringTime,firstTime,firstFee,additionalTime,additionalFee)}円です。`)
        setEnteringTime(null);
        console.log(open)
    }



    const parseEnteringTime = (enteringTime) =>{
        if(enteringTime){
            return parseElaspedTimeAsMin(enteringTime)
        }else{
            return ''
        }
    }

    const parseEnteringTimeAsSecond = (enteringTime) =>{
        if(enteringTime){
            return parseElaspedTimeAsSec(enteringTime)
        }else{
            return ''
        }
    }

    return (
        isSeat?<div id={id}><div className={classes.squareRoot} onClick={()=>handleSeatClick()}>
            {enteringTime?<MdPerson/>:<MdEventSeat/>}
            <div>{parseEnteringTime(enteringTime)||"空席"}</div>
        </div>
        <SeatDialog open={open} onClose={handleClose} handleEnter={handleEnter} handleExit={handleExit} enteringTime={enteringTime} elapsedTime={parseEnteringTime(enteringTime)} chargeFee={calcChargeFee(enteringTime,firstTime,firstFee,additionalTime,additionalFee)}/>
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

