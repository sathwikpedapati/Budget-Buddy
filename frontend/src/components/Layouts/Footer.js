import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        mt: 1,
        py: 4,
        flexGrow:0.2
      }}
    >
      <Container style={{marginTop:"1.6rem"}}>
        <Box mt={1} textAlign="center">
          <Typography variant="body2" style={{}}>
           Made with ❤️ for better budgeting — © 2025 Money Track
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
