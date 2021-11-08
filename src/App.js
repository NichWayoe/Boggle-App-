import BoggleSolverHomeComponent from './components/BoggleSolverHomeComponent.react'
import {buildTrie, generateGrid, findValidWordsFromGrid} from './utils/BoggleSolverUtils.js'
import {useState} from 'react'
import './App.css';

function App() {
  const [grid, setGrid] = useState(generateGrid())
  const trie = buildTrie()
  const validWords = findValidWordsFromGrid(grid, trie);
  return (
    <div className="App">
      <header className="App-header"> 
      <BoggleSolverHomeComponent grid={grid} setGrid={setGrid} validWords={validWords}></BoggleSolverHomeComponent>
      </header>
     
    </div>
  );
}

export default App;
