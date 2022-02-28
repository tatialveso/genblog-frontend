import React from 'react';
import { Typography, Box, Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokenReducer';
import './Footer.css';

function Footer() {
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );

    var footerComponent;

    if (token != "") {
        footerComponent = <Grid container direction="row" justifyContent="center" alignItems="center" className="footer">
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
    }

    return (
        <>
            {footerComponent}
        </>
    )
}

export default Footer;
