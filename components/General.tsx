import DynamicMap from "./Map"
import { useState,createContext, useEffect,useContext } from 'react'
import { Button } from "@material-ui/core";
import EditiInfoDialog from "./EditInfoDialog";
import dynamic from "next/dynamic";
import { useLocalStorage } from "../hooks/useLocalStorage";


const ChargeFeeContext = createContext([]);


export const useChargeFee = () =>{
    return useContext(ChargeFeeContext);
}

const General = () => {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        const newChaegeFee = new Array(...chargeFee)
        setChargeFee(newChaegeFee)
        setOpen(false);
      };

    const [chargeFee,setChargeFee] = useState([useLocalStorage("firstTime",3600),useLocalStorage("firstFee",1000),useLocalStorage("additionalTime",1800),useLocalStorage("additionalFee",500)])
    // 左から初回時間，初回料金，延長時間，延長料金

    useEffect(() => {
        localStorage.setItem("firstTime",JSON.stringify(chargeFee[0]))
        localStorage.setItem("firstFee",JSON.stringify(chargeFee[1]))
        localStorage.setItem("additionalTime",JSON.stringify(chargeFee[2]))
        localStorage.setItem("additionalFee",JSON.stringify(chargeFee[3]))
    }, [chargeFee])

    // const chargeFee = [firstTime,firstFee,additionalTime,additionalFee]
    // const setChargeFee = [setFirstTime,setFirstFee,setAdditionalTime,setAdditionalFee]
    return (
        <ChargeFeeContext.Provider value={chargeFee}>
            
        <DynamicMap/>
        <Button variant='contained' color='secondary' onClick={()=>setOpen(true)}>店舗情報を編集</Button>
        <EditiInfoDialog open={open} onClose={handleClose} chargeFee={chargeFee} setChargeFee={setChargeFee}/>
        </ChargeFeeContext.Provider>
    )
}

const DynamicGeneral = dynamic(
    {
      loader: async () => General,
    },
    { ssr: false }
  );


export default DynamicGeneral
