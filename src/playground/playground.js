import { Box, Dialog } from "@mui/material"
import "./playground.css"
export default function Playground({children}){
    const width = 30
    let left = -30
    function boxshape(bg, key){
        left+=width

        return <Box key={key} sx={{
            position: "absolute",
            left: `${left}%`,
            width: `${width}%`,
            height: '100%',
            background: bg,
            transform: "skew(-40deg)",
            transformOrigin: "top",
            boxShadow: 24
        }}/>
    }
    const colors = ['#FFC09F', "#A0CED9", "#FFEE93", "#adf7b6", "#fcf5c7"]
    function createBoxes(iterations){
        let results = []
        for(let i = 0; i< iterations; i++){
            results = [...results, colors.map((c,ier)=> boxshape(c,(i+ier)))]
        }
        return results
    }
    return (
        <Box sx={{height: '100vh'}}>
            {createBoxes(2)}
            <Dialog open={true}>
                <Box p={5} >
                    {children}
                </Box>
            </Dialog>
        </Box>
    )
}