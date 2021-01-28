import Button from '../Button';
import Widget from '../Widget';
import AlternativesForm from '../AlternativeForm';
import styled from 'styled-components';
import { useEffect } from 'react';
// import StatusBar from '../StatusBar';

const Status = styled.p`
  text-align: center;
`;

const QuestionWidget = (
  { 
    question, 
    onSubmit,
    selectedAlternative,
    setSelectedAlternative,
    isCorrect, 
    isQuestionsSubmited,
    points,
  }
  ) => {

  function handleSubmit(e) {
    e.preventDefault();
    document.getElementById('question_image').style.filter = 'brightness()';
    onSubmit();
  }

  return (
    <Widget>
      <Widget.Header>
        <h3>
          {question.title}
        </h3>
      </Widget.Header>

      <Widget.Image src={question.image} id="question_image" />

      { !isQuestionsSubmited && <Status>Você está com {points} ponto{points == 1 ? '' : 's'}!</Status> }
      { isQuestionsSubmited && isCorrect && <Status>Resposta correta!</Status> }
      { isQuestionsSubmited && !isCorrect && <Status>Resposta errada. Era o {question.answer}!</Status> }

      <Widget.Content>
        <AlternativesForm onSubmit={handleSubmit} >
          {question.alternatives.map((alternative, index) => {
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';

            return (
              <Widget.Topic
                as="label"
                key={`alternative${index}`}
                htmlFor={`alternative${index}`}
                data-selected={selectedAlternative === alternative}
                data-status={isQuestionsSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={`alternative${index}`}
                  name="question"
                  onChange={() => setSelectedAlternative(alternative)}
                  type="radio"
                />
                {alternative.charAt(0).toUpperCase() + alternative.slice(1)}
              </Widget.Topic>
            )
          })}
          
          <Button type="submit" disabled={!selectedAlternative}>
            Confirmar
          </Button>
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

export default QuestionWidget;