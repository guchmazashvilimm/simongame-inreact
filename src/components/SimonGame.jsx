import React from "react";
import  { useState, useRef, useEffect } from "react";
import GameButton from "./GameButton";
const colors = ["green","red","yellow","blue"];

function SimonGame() {
    
    const [sequence,setSequence] = useState([]);
    const [playing,setPlaying]= useState(false);
    const [playingIdx,setPlayingIdx] = useState(0);
    const [gameOver,setGameOver] = useState("#b3bdf5");
  
    const greenRef = useRef(null);
    const redRef = useRef(null);
    const yellowRef = useRef(null);
    const blueRef = useRef(null);
    const gameOvr = () =>{
        setSequence([]);
        setPlaying(false);
        setPlayingIdx(0);
        setTimeout(()=>{
          setGameOver("#b3bdf5")
        
        },250)
        setGameOver("red")
        
    };
    
    
    const addNewColor = () => {
        const color = colors[Math.floor(Math.random() * 4)];
        const newSequence = [...sequence,color];
        setSequence(newSequence);

    };

    const handleNextLevel = () => {
        if (!playing) {
          setPlaying(true);
          addNewColor();

          
        }
    };

   
  const handleColorClick = (e) => {
    if (playing) {
      e.target.classList.add("opacity-50");

      setTimeout(() => {
        e.target.classList.remove("opacity-50");

        const clickColor = e.target.getAttribute("color");

        // clicked the correct color of the sequence
        if (sequence[playingIdx] === clickColor) {
          // clicked the last color of the sequence
          if (playingIdx === sequence.length - 1) {
            setTimeout(() => {
              setPlayingIdx(0);
              addNewColor();
            }, 250);
          }

          // missing some colors of the sequence to be clicked
          else {
            setPlayingIdx(playingIdx + 1);
          }
        }

        // clicked the incorrect color of the sequence
        else {
          gameOvr();
          // alert("You Lost!");
        }
      }, 250);
    }
  };

    useEffect(()=>{
        if (sequence.length > 0 ){
            const showSequence = (idx = 0)=>{
                let ref = null;
    
                if (sequence[idx] === "green") ref = greenRef;
                if (sequence[idx] === "red") ref = redRef;
                if (sequence[idx] === "yellow") ref = yellowRef;
                if (sequence[idx] === "blue") ref = blueRef;
    
                //highlight 
                setTimeout(()=>{
                    ref.current.classList.add("opacity-50");
    
                    setTimeout(()=>{
                        ref.current.classList.remove("opacity-50");
                        if (idx < sequence.length -1) showSequence(idx + 1)
                    },250);
                },250);

            };

            showSequence();
        }


    },[sequence]);

    return (
        <>
        {/* main container */}
        <div className="main-container">
      
            {/* game container */}
                <div className="game-container">
                    {/* green and red container */}
                    <div className="color-cards">
                        <GameButton border="rounded"   color="green" bg="bg-success" ref={greenRef} onClick={handleColorClick}/>
                        <GameButton border="rounded"  color="red" bg="bg-danger" ref={redRef} onClick={handleColorClick} />
                    </div>

                    {/* yellow and blue container */}
                    <div className="color-cards">
                        <GameButton border="rounded"  color="yellow" bg="bg-warning" ref={yellowRef} onClick={handleColorClick}/>
                        <GameButton border="rounded"  color="blue" bg="bg-info" ref={blueRef} onClick={handleColorClick}/>
                    </div>
                   
                </div>
                <button onClick={handleNextLevel} className="play-btn rounded-circle" style={{color:gameOver}} >
                   {sequence.length === 0 ? "Play" : sequence.length}
                </button>
        </div>       
        </>
    )
}

export default SimonGame;