import React from 'react';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { Typography, Box, Grid } from '@material-ui/core';
import './Footer.css';

function Footer() {
    return (
        <>
            <Grid container direction="row" justifyContent="center" alignItems="center" className="footer">
                <Grid alignItems="center" item xs={12}>
                    <Box>
                        <Box paddingTop={1}>
                            <Typography
                                variant="subtitle2"
                                align="center"
                                gutterBottom
                                style={{ color: "white" }}>
                                2022 © todos os direitos reservados
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                variant="subtitle2"
                                gutterBottom
                                style={{ color: "white" }}
                                align="center">
                                feito com ❤ por <a href="https://tatialveso.github.io" target="_blank">tati alves</a>
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default Footer;
