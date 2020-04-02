import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography, Button, IconButton } from '@material-ui/core';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';

export default (question, questionIndex, currentQuestion, setCurrentQuestion, addQuestionResponse) => {
  console.info('question', question);
  const q = question.question;

  const getOrdinalAnswer = index => {
    switch(index) {
      case 1:
        return 'FIRST';
      case 2:
        return 'SECOND';
      case 3:
        return 'THIRD';
      case 4:
        return 'FOURTH';
      case 5:
        return 'FIFTH';
      default:
        return 'INVALID';
    }
  }

  const getChoices = choices => {
    if (choices.length === 5 && choices[0] === ':(') {
      return (
        <React.Fragment>
          <IconButton aria-label="Very Dissatisfied" onClick={() => answer(getOrdinalAnswer(1))}>
            <SentimentVeryDissatisfiedIcon color="secondary" fontSize="large" />
          </IconButton>
          <IconButton aria-label="Dissatisfied" onClick={() => answer(getOrdinalAnswer(2))}>
            <SentimentDissatisfiedIcon color="secondary" fontSize="large" />
          </IconButton>
          <IconButton aria-label="Neutral" onClick={() => answer(getOrdinalAnswer(3))}>
            <SentimentSatisfiedIcon color="secondary" fontSize="large" />
          </IconButton>
          <IconButton aria-label="Satisfied" onClick={() => answer(getOrdinalAnswer(4))}>
            <SentimentSatisfiedAltIcon color="secondary" fontSize="large" />
          </IconButton>
          <IconButton aria-label="Very Satisfied" onClick={() => answer(getOrdinalAnswer(5))}>
            <SentimentVerySatisfiedIcon color="secondary" fontSize="large" />
          </IconButton>
        </React.Fragment>
      );
    }
    return choices.map((choice, i) => <Button key={choice} variant="contained" onClick={() => answer(getOrdinalAnswer(i + 1))}>{choice}</Button>);
  }

  const answer = ans => {
    const ansObject = {
      // "answer": ans,
      "questionId": q.id,
      // "questionName": q.name,
      // "questionText": '',
      // "questionType": q.type,
      // "expectedAnswer": q.expectedAnswer
      "response": ans
    };
    question.addQuestionResponse(ansObject);
  }

  let answerButtons;
  switch (q.type) {
    case 'YES_NO':
      answerButtons = (
        <React.Fragment>
          <Button variant="contained" onClick={() => answer('NO')}>No</Button>
          <Button variant="contained" onClick={() => answer('YES')}>Yes</Button>
        </React.Fragment>
      );
      break;
    case 'CHOICES':
      answerButtons = getChoices(q.choices);
      break;
    default:
      answerButtons = (
        <Button variant="contained" onClick={() => answer('ACK')}>OK</Button>
      );
  }

  console.info(question.questionIndex, question.currentQuestion);
  if (question.questionIndex !== question.currentQuestion)
    return null;

  return (
    <Grid container spacing={2} className="question">
      <Grid item xs={12} md={8}>
        <Typography variant="h6" color="inherit">
          {q.name}
        </Typography>
      </Grid>
      <Grid item xs={12} md={4} className="center">
        {answerButtons}
      </Grid>
    </Grid>
  );
}
