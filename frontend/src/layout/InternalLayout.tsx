import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material'

function InternalLayout({ children }: React.PropsWithChildren) {
    return (
        <Box>
            <AppBar
                sx={{ padding: '1rem' }}
                variant="outlined"
                position="relative"
            >
                <Typography color="#fff" variant="h6">
                    Tasks
                </Typography>
            </AppBar>
            <Container sx={{ padding: '4rem' }}>{children}</Container>
        </Box>
    )
}

export default InternalLayout
