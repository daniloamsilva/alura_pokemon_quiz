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
          <Widget.Topic
            as="label"
            htmlFor="alternative1"
          >
            <input
              id="alternative1"
              name="question"
              type="radio"
            />
            {question.alternative1.charAt(0).toUpperCase() + question.alternative1.slice(1)}
          </Widget.Topic>

          <Widget.Topic
            as="label"
            htmlFor="alternative2"
          >
            <input
              id="alternative2"
              name="question"
              type="radio"
            />
            {question.alternative2.charAt(0).toUpperCase() + question.alternative2.slice(1)}
          </Widget.Topic>

          <Widget.Topic
            as="label"
            htmlFor="alternative3"
          >
            <input
              id="alternative3"
              name="question"
              type="radio"
            />
            {question.alternative3.charAt(0).toUpperCase() + question.alternative3.slice(1)}
          </Widget.Topic>

          <Widget.Topic
            as="label"
            htmlFor="alternative4"
          >
            <input
              id="alternative4"
              name="question"
              type="radio"
            />
            {question.alternative4.charAt(0).toUpperCase() + question.alternative4.slice(1)}
          </Widget.Topic>
          
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
        alternative1: pokemon1.data.name,
        alternative2: pokemon2.data.name,
        alternative3: pokemon3.data.name,
        alternative4: pokemon4.data.name
      }

      console.log(question);
  
      setCurrentQuestion(question);
  
    }

    handleSortPokemon(array);

    setScreenState(screenStates.QUIZ);
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