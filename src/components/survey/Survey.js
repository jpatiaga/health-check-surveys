import React, { useState } from 'react';
import { Typography, Button } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Question from './Question';

export default (survey, postSurveyResult) => {
  const s = survey.survey;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionResponses, setQuestionResponses] = useState([]);

  const addQuestionResponse = questionResponse => {
    questionResponses.push(questionResponse)
    setQuestionResponses(questionResponses);
    setCurrentQuestion(currentQuestion + 1);
  }

  if (currentQuestion >= s.questions.length) {
    return (
      <Container maxWidth="lg">
        <Grid container spacing={4} className="survey">
          <Grid item xs={12}>
            <Typography variant="h6" color="inherit">
              Thank you for completing the survey. Press the button below to submit your answers and go back to the home screen.
            </Typography>
          </Grid>
          <Grid item xs={12} className="center">
            <Button variant="contained" color="secondary" onClick={() => survey.postSurveyResult(questionResponses)}>Submit</Button>
          </Grid>
        </Grid>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg">
      <Grid container spacing={4} className="survey">
        {s.questions.map((question, i) => <Question key={question.id} question={question} questionIndex={i} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} addQuestionResponse={addQuestionResponse} />)}
      </Grid>
    </Container>
  );
}