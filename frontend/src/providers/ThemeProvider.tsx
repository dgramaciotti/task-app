import { createTheme, ThemeProvider } from '@mui/material/styles'
import { brown, green, red, yellow } from '@mui/material/colors'

const theme = createTheme({
    palette: {
        primary: green,
        secondary: brown,
        error: red,
        warning: yellow,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                contained: {
                    backgroundColor: '#4caf50',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: '#2e7d32', // Optional: darker hover color
                    },
                    borderRadius: '2rem',
                },
            },
        },
    },
})

export default function AppTheme({ children }: React.PropsWithChildren) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
