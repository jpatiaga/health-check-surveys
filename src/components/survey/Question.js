import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography, Button, IconButton } from '@material-ui/core';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';

export default (question, questionIndex, currentQuestion, setCurrentQuestion, addQuestionResponse) => {
  console.info('question', question);
  const q = question.question;

  const ordinal_suffix_of = i => {
    const j = i % 10,
        k = i % 100;
    if (j === 1 && k !== 11) {
        return i + "st";
    }
    if (j === 2 && k !== 12) {
        return i + "nd";
    }
    if (j === 3 && k !== 13) {
        return i + "rd";
    }
    return i + "th";
  }

  const getChoices = choices => {
    if (choices.length === 3 && choices[0] === 'bad') {
      return (
        <React.Fragment>
          <IconButton aria-label="Very Dissatisfied" onClick={() => answer(ordinal_suffix_of(1))}>
            <SentimentVeryDissatisfiedIcon color="secondary" fontSize="large" />
          </IconButton>
          <IconButton aria-label="Dissatisfied" onClick={() => answer(ordinal_suffix_of(2))}>
            <SentimentDissatisfiedIcon color="secondary" fontSize="large" />
          </IconButton>
          <IconButton aria-label="Very Satisfied" onClick={() => answer(ordinal_suffix_of(3))}>
            <SentimentVerySatisfiedIcon color="secondary" fontSize="large" />
          </IconButton>
        </React.Fragment>
      );
    }
    return choices.map((choice, i) => <Button key={choice} variant="contained" onClick={() => answer(ordinal_suffix_of(i + 1))}>{choice}</Button>);
  }

  const answer = ans => {
    const ansObject = {
      "answer": ans,
      "questionId": q.id,
      "questionName": q.name,
      "questionText": '',
      "questionType": q.type,
      "expectedAnswer": q.expectedAnswer
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
        <Button variant="contained">OK</Button>
      );
  }

  console.info(question.questionIndex, question.currentQuestion);
  if (question.questionIndex !== question.currentQuestion) return null;

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