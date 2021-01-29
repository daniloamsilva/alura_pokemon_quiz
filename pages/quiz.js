import { useEffect, useState } from 'react';

import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuestionWidget from '../src/components/QuestionWidget';
import LoadingWidget from '../src/components/LoadingWidget';
import ResultWidget from '../src/components/ResultWidget';

import db from '../db.json';
import api from '../src/services/api';

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
    let array = [];
    for (let i = 0; i < 4; i++){
      const random_number = Math.floor(Math.random() * 151 + 1)
      if(array.indexOf(random_number) == -1) array.push(random_number);
    }

    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;
    
      while (0 !== currentIndex) {
    
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
    
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
    
      return array;
    }

    async function handleSortPokemon(array) {
      const [pokemon1, pokemon2, pokemon3, pokemon4] = await Promise.all([
        api.get(`pokemon/${array[0]}`),
        api.get(`pokemon/${array[1]}`),
        api.get(`pokemon/${array[2]}`),
        api.get(`pokemon/${array[3]}`),
      ])
      
      const question = {
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon1.data.id}.png`,
        title: 'Quem é esse Pokemon?',
        answer: pokemon1.data.name,
        alternatives: [
          pokemon1.data.name,
          pokemon2.data.name,
          pokemon3.data.name,
          pokemon4.data.name
        ]
      }

      setCurrentQuestion(question);
      question.alternatives = shuffle(question.alternatives);
      setScreenState(screenStates.QUIZ);
    }

    if(screenState == screenStates.LOADING){
      handleSortPokemon(array);
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