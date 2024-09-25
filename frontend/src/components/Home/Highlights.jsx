import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

const items = [
  {
    icon: <SettingsSuggestRoundedIcon />,
    title: 'AI-Powered Form Creation',
    description: 'Utilize advanced AI technology for seamless and intuitive form creation tailored to your specific needs.'
  },
  {
    icon: <AttachMoneyRoundedIcon />,
    title: 'Token-Based Reward System',
    description: 'Engage users effectively with a rewarding system that incentivizes form creation and completion.'
  },
  {
    icon: <InsightsRoundedIcon />,
    title: 'Data Visualization Tools',
    description: 'Gain valuable insights quickly with integrated visualization features that simplify data analysis.'
  },
  {
    icon: <AutoFixHighRoundedIcon />,
    title: 'Innovative Functionality',
    description: 'Stay ahead with cutting-edge features that continuously adapt to meet your evolving data collection needs.'
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: 'Dedicated Customer Support',
    description: 'Receive expert assistance whenever needed, ensuring a smooth experience throughout your journey with us.'
  },
  {
    icon: <CheckCircleRoundedIcon />,
    title: 'Robust Performance',
    description: 'Enjoy a reliable platform designed for durability, ensuring a smooth experience even under high usage.'
  }
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: '#06090a'
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 }
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' }
          }}
        >
          <Typography component="h2" variant="h4">
            Highlights
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
            Explore why our product stands out: adaptability, durability, user-friendly design, and innovation. Enjoy reliable customer
            support and precision in every detail.
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="column"
                color="inherit"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  p: 3,
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'grey.800',
                  background: 'transparent',
                  backgroundColor: 'grey.900'
                }}
              >
                <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                <div>
                  <Typography fontWeight="medium" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
