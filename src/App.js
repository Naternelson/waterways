import './App.css';
import { useState } from 'react';
import { Container } from '@mui/material';
import WaterwayList from './componenets/waterway-list/waterway-list';
import { useEffect } from 'react';
import { locationChanged } from "./api/usgs/waterways-slice"
import {useDispatch, useSelector} from "react-redux"
import {getWaterData} from "./api/usgs/waterways-slice"

function App() {
  
  
  return (
      <Container>
        <WaterwayList/>
      </Container>
  );
}

export default App;
