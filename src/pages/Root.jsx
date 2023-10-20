import { Outlet } from "react-router-dom"
import { AppNavBar } from "../components/AppNavBar/AppNavBar"
import { Box } from "@mui/material"
import { CssBaseline } from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles'


export const Root = () =>{
    const THEME = createTheme({
        palette: {
          primary: { main:'#fff'},
          secondary: {main:'#5A698F'},
        },
      })

    return(
        <ThemeProvider theme ={THEME}>
            <CssBaseline>
                <Box  sx={{
                minHeight:'100%',
                backgroundColor:'#10141E',
                display:'flex',
                flexDirection:{ xs:'column' ,sm:'column', md:'row',lg:'row',xl:'row'}
                }}>
                    <AppNavBar/>
                    <Outlet/>
                </Box>
            </CssBaseline>

        </ThemeProvider>

    )
}