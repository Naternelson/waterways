import { Fade } from "@mui/material";

export default function TransitionComponent({as="fade", timeout=1000, change=true, children}){
    switch(as){
        case "fade": 
            return <Fade timeout={timeout}>

            </Fade>
    }
}