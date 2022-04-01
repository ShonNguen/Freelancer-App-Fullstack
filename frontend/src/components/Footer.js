import * as React from 'react';

import { Box, Grid, Container, Typography, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';

function Copyright() {
    return (
        <React.Fragment>
            {'© '}
            <Link color="inherit" href="https://mui.com/">
                Freelance ArchViz
            </Link>{' '}
            {' '}
            {new Date().getFullYear()}
        </React.Fragment>
    );
}

const iconStyle = {
    width: 48,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'warning.main',
    mr: 1,
    '&:hover': {
        bgcolor: 'warning.dark',
    },
};

export default function AppFooter() {
    return (
        <Typography
            component="footer"
            sx={{ display: 'flex', bgcolor: '#616161', color: '#fafafa' }}
        >
            <Container sx={{ my: 8, display: 'flex' }}>
                <Grid container spacing={5}>
                    <Grid item xs={6} sm={4} md={3}>
                        <Grid
                            container
                            direction="column"
                            justifyContent="flex-end"
                            spacing={2}
                            sx={{ height: 120 }}
                        >
                            <Grid item sx={{ display: 'flex' }}>
                                <Link href='https://www.facebook.com/Behance/'>
                                    <FacebookIcon sx={{ color: '#fafafa', mr: 1}} />
                                </Link>
                                <Link href='https://www.instagram.com/behance/?hl=bg'>
                                    <InstagramIcon sx={{ color: '#fafafa', mr: 1 }} />
                                </Link>
                                <Link href='https://github.com/ShonNguen/Freelancer-site'>
                                    <GitHubIcon sx={{ color: '#fafafa' }} />
                                </Link>
                            </Grid>
                            <Grid item>
                                <Copyright />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                        <Typography variant="h6" marked="left" gutterBottom>
                            Legal
                        </Typography>
                        <Box component="ul" sx={{ m: 0, listStyle: 'none', p: 0 }}>
                            <Box component="li" sx={{ py: 0.5 }}>
                                <Link href="https://mui.com/premium-themes/onepirate/terms/" sx={{ color: '#fafafa' }}>Terms</Link>
                            </Box>
                            <Box component="li" sx={{ py: 0.5 }}>
                                <Link href="https://mui.com/premium-themes/onepirate/privacy/" sx={{ color: '#fafafa' }}>Privacy</Link>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Typography>
    );
}