import { useEffect, useState } from 'react';

import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuestionWidget from '../src/components/QuestionWidget';
import LoadingWidget from '../src/components/LoadingWidget';
import ResultWidget from '../src/components/ResultWidget';

import db from '../db.json';

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [selectedAlternative, setSelectedAlternative] = useState();
  const [isQuestionsSubmited, setIsQuestionsSubmited] = useState(false);
  const [points, setPoint] = useState(0);

  const isCorrect = selectedAlternative === currentQuestion.answer;

  useEffect(() => {
    async function handleSortPokemon() {
      const pokemonList = JSON.parse(localStorage.getItem('@AluraPokemonQuiz:pokemonList'));

      let random_ids = [];

      while(random_ids.length < 4){
        const random_number = Math.floor(Math.random() * 151);
        if(random_ids.indexOf(random_number) == -1) random_ids.push(random_number);
      }
      
      const question = {
        image: `https://pokeres.bastionbot.org/images/pokemon/${random_ids[0] + 1}.png`,
        title: 'Quem é esse Pokemon?',
        answer: pokemonList[random_ids[0]].name,
        alternatives: [
          pokemonList[random_ids[0]].name,
          pokemonList[random_ids[1]].name,
          pokemonList[random_ids[2]].name,
          pokemonList[random_ids[3]].name
        ]
      }

      question.alternatives = shuffle(question.alternatives);
      setCurrentQuestion(question);
      setScreenState(screenStates.QUIZ);
    }

    function shuffle(array) {
      let currentIndex = array.length, temporaryValue, randomIndex;
    
      while (0 !== currentIndex) {
    
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
    
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
    
      return array;
    }

    if(screenState == screenStates.LOADING){
      handleSortPokemon();
    }
  }, [screenState]);

  function handleSubmitQuiz() {
    setIsQuestionsSubmited(true);

    if(isCorrect){
      setPoint(points + 1);
      setTimeout(() => {
        setScreenState(screenStates.LOADING);
        setSelectedAlternative();
        setIsQuestionsSubmited(false);
      }, 2 * 1000)
    } else {
      setTimeout(() => setScreenState(screenStates.RESULT), 3 * 1000);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={currentQuestion}
            onSubmit={handleSubmitQuiz}
            selectedAlternative={selectedAlternative}
            setSelectedAlternative={setSelectedAlternative}
            screenState={screenState}
            isCorrect={isCorrect}
            isQuestionsSubmited={isQuestionsSubmited}
            setIsQuestionsSubmited={setIsQuestionsSubmited}
            points={points}
            setPoint={setPoint}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <ResultWidget points={points} />}
      </QuizContainer>
    </QuizBackground>
  );
}