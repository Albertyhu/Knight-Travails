import React, {useState, useContext} from 'react';
import { RenderBoard } from './components/board'; 
import { MainContainer } from './global/styledComponents'; 
import { Coordinate } from './components/knightPath'; 
import { AppContext } from './components/contextItem.js'; 

function App() {
    const [displayKnightPiece, setDisplayKnightPiece] = useState<boolean>(false); 

    const [locationX, setLocationX] = useState('0px'); 
    const [locationY, setLocationY] = useState('0px');

    const [startingPiecePlaced, setStartingPiecePlaced] = useState<boolean>(false); 
    const [startingGraphicalLoc, setStartingGraphicalLoc] = useState(null)
    const [startingLocation, setStartingLocation] = useState<Coordinate | null>(null) 
    const context = {
        displayKnightPiece, 
        setDisplayKnightPiece,
        locationX,
        setLocationX,
        locationY,
        setLocationY, 
        startingPiecePlaced, 
        setStartingPiecePlaced, 
    }
    return (
      <AppContext.Provider value = {context}>
          <MainContainer className="App">
              <RenderBoard rows={8} /> 
          </MainContainer>
       </AppContext.Provider>
  );
}

export default App;
