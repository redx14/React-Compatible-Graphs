import React, { useState } from 'react';
import { Container, ToggleButton, ToggleButtonGroup, Typography, Box } from '@mui/material';
// import Recharts from './Graphs/Recharts';
import ChartJSGraph from './Graphs/ChartJS/ChartJSGraph';
// import Highcharts from './Graphs/Highcharts';
// import XCharts from './Graphs/XCharts';

const HomePage: React.FC = () => {
  const [graphType, setGraphType] = useState('recharts');

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Graph Viewer
      </Typography>

      <ToggleButtonGroup
        value={graphType}
        exclusive
        onChange={(_, val) => val && setGraphType(val)}
        sx={{ mb: 4 }}
      >
        <ToggleButton value="recharts">Recharts</ToggleButton>
        <ToggleButton value="chartjs">Chart.js</ToggleButton>
        <ToggleButton value="highcharts">Highcharts</ToggleButton>
        <ToggleButton value="xcharts">XCharts</ToggleButton>
      </ToggleButtonGroup>

      <Box>
        {/* {graphType === 'recharts' && <Recharts />} */}
        {graphType === 'chartjs' && <ChartJSGraph />}
        {/* {graphType === 'highcharts' && <Highcharts />}
        {graphType === 'xcharts' && <XCharts />} */}
      </Box>
    </Container>
  );
};

export default HomePage;
