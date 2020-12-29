import arrow from './arrow.svg';
import './App.css';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { Table } from './Compoenets/table';
import './App.css';

const App = () => {

  const [ rows, setRows] = useState(0)  
  const [ cols, setCols] = useState(0)
  const [ xIndex, setXIndex] = useState(-1)
  const [ yIndex, setYIndex] = useState(-1)
  const [ disabledX, setDisabledX ] = useState(true)
  const [ disabledY, setDisabledY ] = useState(true)



  const moveX = (a) => {
        setXIndex(xIndex + a)
        var current = document.querySelector("table>tbody").childNodes[xIndex + a ].childNodes[ yIndex === -1 ? 0 : yIndex ] 
        current.style.backgroundColor = "red"
  }

  const moveY = (a) => {
        setYIndex(yIndex + a)
        var current = document.querySelector("table>tbody").childNodes[xIndex === -1 ? 0 : xIndex].childNodes[ yIndex + a ] 
        console.log('bottom', current)
        current.style.backgroundColor = "red"
    
}
  const move = (e) => {
    let direction = e.target.className      
    let cells = document.querySelectorAll("td")
    cells.forEach(cell => { cell.style.background = "white" })

    switch(direction){
      case 'bottom':
        xIndex < rows-1 ? moveX( +1 ) : setXIndex(rows)
        break;
      case 'top':
        xIndex > 0 ? moveX( -1 ) : setXIndex(-1)
        break;
      case 'right':
        yIndex < cols-1 ? moveY( +1 ) : setYIndex(cols)
        break;
      case 'left':
        xIndex > 0 ? moveY( -1 ) : setYIndex(-1)
        break;
    }
    
    
  }

  useEffect(() =>{
    if(rows && cols){
      setDisabledX(false)
      setDisabledY(false)
    }
  }, [ rows, cols, xIndex, yIndex, disabledX, disabledY])
  

  return (
    <div className="main_container">
      <div className="table_setup">
        <div className="input_rows_and_cols">
          <input type='text' placeholder='row' onChange={ (e) => setRows( parseInt(e.target.value) ) } />
          <input type='text' placeholder='row' onChange={ (e) => setCols( parseInt(e.target.value) ) }/>
        </div>
        <div className="directions">
          <img src={arrow} className="top" onClick={ (e) => move(e) } disabled ={disabledY}/>
          <div className="traverse_left_right">
            <img src={arrow} className="left" onClick={move} disabled ={disabledX}/>
            <img src={arrow} className="right" onClick={ (e) => move(e) } disabled ={disabledX}/>
          </div>
          <img src={arrow} className="bottom" onClick={ (e) => move(e) } disabled ={disabledY}/>
        </div> 
      </div>
      <table>
            <tbody>
                {
                    !!rows && !!cols && _.times( rows, () => <tr>{ _.times( cols,() => <td style={{ backgroundColor : "white"}}></td> )}</tr>)
                }
            </tbody>
        </table> 
      
    </div>

    
  );
}

export default App;
