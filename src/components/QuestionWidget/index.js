import styled from 'styled-components';
import { motion } from 'framer-motion';

import Button from '../Button';
import Widget from '../Widget';
import AlternativesForm from '../AlternativeForm';
import BackLinkArrow from '../BackLinkArrow';

import db from '../../../db.json';

const StatusPoints = styled.p`
  padding-bottom: 0;
  text-align: center;
  background-color: ${db.theme.colors.secondary};
  margin: 0 35px;
  border-radius: 5px;
  padding: 10px;
`;

const StatusSuccess = styled.p`
  padding-bottom: 0;
  text-align: center;
  background-color: ${db.theme.colors.success};
  margin: 0 35px;
  border-radius: 5px;
  padding: 10px;
`;

const StatusWrong = styled.p`
  padding-bottom: 0;
  text-align: center;
  background-color: ${db.theme.colors.wrong};
  margin: 0 35px;
  border-radius: 5px;
  padding: 10px;
`;

const QuizBackground = styled.div`
  background-image: ${db.quiz_bg};
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
        <BackLinkArrow href={'/'} />
        <h3>
          {question.title}
        </h3>
      </Widget.Header>

      <QuizBackground>
        <Widget.Image
          as={motion.img}
          transition={{ delay: 0, duration: 2 }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
          src={question.image} 
          id="question_image" 
        />
      </QuizBackground>

      { !isQuestionsSubmited && 
        <StatusPoints
          as={motion.p}
          transition={{ delay: 0, duration: 0.8 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >Você está com {points} ponto{points == 1 ? '' : 's'}!</StatusPoints> 
      }
      { isQuestionsSubmited && isCorrect && <StatusSuccess>Resposta correta!</StatusSuccess> }
      { isQuestionsSubmited && !isCorrect && <StatusWrong>Resposta errada. Era o {question.answer}!</StatusWrong> }

      <Widget.Content>
        <AlternativesForm onSubmit={handleSubmit} >
          {question.alternatives.map((alternative, index) => {
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';

            return (
              <Widget.Topic
                as={motion.label}
                transition={{ delay: index - (0.9 * index), duration: 0.5 }}
                variants={
                  index % 2 == 0 ?
                  {
                  show: { opacity: 1, x: '0' },
                  hidden: { opacity: 0, x: '-150%' },
                  } :
                  {
                  show: { opacity: 1, x: '0' },
                  hidden: { opacity: 0, x: '150%' },
                  }
                }
                initial="hidden"
                animate="show"
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
          
          <Button 
            as={motion.button}
            transition={{ delay: 0, duration: 0.8 }}
            variants={{
              show: { opacity: 1 },
              hidden: { opacity: 0 },
            }}
            initial="hidden"
            animate="show"
            type="submit" 
            disabled={!selectedAlternative || isQuestionsSubmited}>
            Confirmar
          </Button>
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

export default QuestionWidget;