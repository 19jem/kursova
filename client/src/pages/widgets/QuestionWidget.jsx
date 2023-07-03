// QuestionWidget.jsx
import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography, Button } from "@mui/material";
import React, { useState, useEffect } from "react";

const QuestionWidget = ({ question, index, onAnswerSubmit, disabled }) => {
  const { questionText, options } = question;
  const [selectedOption, setSelectedOption] = useState("");
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isOptionCorrect, setIsOptionCorrect] = useState(null);

  useEffect(() => {
    setSelectedOption("");
    setIsAnswerSubmitted(false);
    setIsOptionCorrect(null);
  }, [question]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    const selectedOptionData = options.find((option) => option.optionText === selectedOption);
    const isOptionCorrect = selectedOptionData.isCorrect;

    setIsAnswerSubmitted(true);
    onAnswerSubmit({ index, selectedOptionData });
    setIsOptionCorrect(isOptionCorrect);
  };

  return (
    <Box>
      <Typography variant="h6">{questionText}</Typography>
      <FormControl component="fieldset">
        <RadioGroup value={selectedOption} onChange={handleOptionChange}>
          {options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option.optionText}
              control={<Radio />}
              label={option.optionText}
              disabled={disabled || isAnswerSubmitted}
            />
          ))}
        </RadioGroup>
      </FormControl>
      {isAnswerSubmitted && (
        <Box mt="1rem">
          <Typography variant="h6" color={isOptionCorrect ? "green" : "red"}>
            {isOptionCorrect ? "Правильна відповідь!" : "Неправильна відповідь!"}
          </Typography>
        </Box>
      )}
      {!isAnswerSubmitted && (
        <Box mt="1rem">
          <Button variant="contained" onClick={handleSubmit} disabled={!selectedOption}>
            Відповісти
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default QuestionWidget;

