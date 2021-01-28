import { useEffect, useState } from 'react';

import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Button from '../src/components/Button';

import db from '../db.json';
import api from '../src/services/api';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        [Desafio do Loading]
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({ question, onSubmit }) {
  
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

  question.alternatives = shuffle(question.alternatives);

  return (
    <Widget>
      <Widget.Header>
        <h3>
          {question.title}
        </h3>
      </Widget.Header>

      <Widget.Image src={question.image} />

      <Widget.Content>
        <form
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            onSubmit();
          }}
        >
          {question.alternatives.map((alternative, index) => (
            <Widget.Topic
              as="label"
              htmlFor={`alternative${index}`}
            >
              <input
                id={`alternative${index}`}
                name="question"
                type="radio"
              />
              {alternative.charAt(0).toUpperCase() + alternative.slice(1)}
            </Widget.Topic>
          ))}
          
          <Button type="submit">
            Confirmar
          </Button>
        </form>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [currentQuestion, setCurrentQuestion] = useState({});

  useEffect(() => {
    let array = [];
    for (let i = 0; i < 4; i++){
      const random_number = Math.floor(Math.random() * 151 + 1)
      if(array.indexOf(random_number) == -1) array.push(random_number);
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

      console.log(question);
  
      setCurrentQuestion(question);
      setScreenState(screenStates.QUIZ);
    }

    handleSortPokemon(array);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
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
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <div>Você acertou X questões, parabéns!</div>}
      </QuizContainer>
    </QuizBackground>
  );
}