import React, { useEffect, useState } from "react";
import { FaHandRock } from "react-icons/fa";
import { FaHandPaper } from "react-icons/fa";
import { FaHandScissors } from "react-icons/fa";

const choices = [
  { name: "Rock", icon: <FaHandRock /> },
  { name: "Paper", icon: <FaHandPaper /> },
  { name: "Scissors", icon: <FaHandScissors /> },
];

const Home = () => {
  const [userChoice, setUserChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [showResult, setShowResult] = useState("");
  const [score, setscore] = useState({
    UserWin: 0,
    UserLose: 0,
    computerWin: 0,
    computerLose: 0,
    draw: 0,
  });

  useEffect(()=>{
    const savedScores = JSON.parse(localStorage.getItem("scores"));
    if(savedScores){
      setscore(savedScores);
    }
  },[])

  const handleUserChoice = (choiceName) => {
    const compChoice = choices[Math.floor(Math.random() * 3)];
    setUserChoice(choiceName);
    setComputerChoice(compChoice.name);
    handleOutCome(choiceName, compChoice.name);
  };

  console.log(score, "score");

  const handleOutCome = (userChoice, compChoice) => {
    if (userChoice == compChoice) {
      setShowResult("Draw");
      setscore((prev) => ({ ...prev, draw: prev.draw + 1 }));
     
    } else if (
      (userChoice == "Rock" && compChoice == "Scissors") ||
      (userChoice == "Paper" && compChoice == "Rock") ||
      (userChoice == "Scissors" && compChoice == "Paper")
    ) {
      setShowResult("User Won");
      setscore((prev) => ({
        ...prev,
        UserWin: prev.UserWin + 1,
        computerLose: prev.computerLose + 1,
      }));
    } else {
      setShowResult("Computer Won");
      setscore((prev) => ({
        ...prev,
        computerWin: prev.computerWin + 1,
        UserLose: prev.UserLose + 1,
      }));
    }
    localStorage.setItem("scores",JSON.stringify(score))
  };

  const handleReset = () =>{
    setShowResult("");
    setscore({
      UserWin: 0,
      UserLose: 0,
      computerWin: 0,
      computerLose: 0,
      draw: 0,
    })

    localStorage.removeItem("scores");
    setUserChoice("");
    setComputerChoice("");
  }

  return (
    <>
      <div className="text-center mt-20">
        <h1 className="text-4xl font-bold font-sans mb-4">Rock Paper Scissors Game</h1>
        <h1 className="text-2xl font-bold mb-8">Result:{showResult}</h1>
        <div className="flex justify-center gap-52">
          {/* left div belongs to User or Guest */}
          <div>
            <h1 className="text-2xl font-bold">User side</h1>
            <h2 className="mb-5">Your choice: {userChoice}</h2>
            <div className="flex gap-5">
              {choices.map(({ name, icon }) => {
                return (
                  <button
                    onClick={() => handleUserChoice(name)}
                    type="button"
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    {icon}
                  </button>
                );
              })}
            </div>
          </div>
          {/* Right div belongs to Computer which randomly will select shape(rock,paper scissors) */}
          <div className="">
            <h1 className="text-2xl font-bold">Computer Side</h1>
            <h2>Computer's choice: {computerChoice}</h2>
          </div>
        </div>
        <h1 className="text-2xl font-bold">ScoreBoard</h1>
        <div className="flex justify-center gap-52">
          <div className="text-left">
            <p>TotalWin:{score.UserWin}</p>
            <p>TotalLose:{score.UserLose}</p>
            <p>Draw:{score.draw}</p>
          </div>
          <div className="text-left">
            <p>TotalWin:{score.computerWin}</p>
            <p>TotalLose:{score.computerLose}</p>
            <p>Draw:{score.draw}</p>
          </div>
        </div>
        <div>
          <button
          onClick={handleReset}
            type="button"
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
