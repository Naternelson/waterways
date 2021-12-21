import { Box, Dialog, DialogContent } from "@mui/material"
import { useSelector } from "react-redux"
import "./playground.css"
export default function Playground({children}){
    // ====================
    // Hooks and Variables
    // ====================
    const {backgroundTheme, backgroundThemes} = useSelector(s => s.ui)
    const theme = backgroundThemes[backgroundTheme]
    const width = 30
    let left = -30

    // ====================
    // Helper Functions
    // ====================
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

    function createBoxes(iterations){
        let results = []
        for(let i = 0; i< iterations; i++){
            results = [...results, theme.map((c,ier)=> boxshape(c,(i+ier)))]
        }
        return results
    }
    return (
        <Box >
            {createBoxes(2)}
            <Dialog open={true} maxWidth={"xl"} fullWidth>
                <DialogContent sx={{p:5}}>
                    <Box>
                        {children}
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    )
}