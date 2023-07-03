// CourseWidget.jsx
import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { useSelector } from "react-redux";
import WidgetWrapper from "components/WidgetWrapper";
import QuestionWidget from "./QuestionWidget";

const CourseWidget = () => {
  const [courses, setCourses] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;

  const getCourses = async () => {
    const response = await fetch("http://localhost:3001/course", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setCourses(data);
  };

  useEffect(() => {
    getCourses();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
/**Move on question logic */
  const handleNextQuestion = () => {
    if (currentQuestionIndex < courses[0].question.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };
/**Answer logic */
  const handleAnswerSubmit = (answeredQuestion) => {
    const { index, selectedOptionData } = answeredQuestion;

    setUserAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[index] = {
        questionText: courses[0].question[index].questionText,
        selectedOptionText: selectedOptionData?.optionText,
        isAnswerCorrect: selectedOptionData?.isCorrect || false,
      };
      return updatedAnswers;
    });
  };
/**Result logic */
  const handleShowResult = () => {
    const correctAnswers = userAnswers.filter((answer) => answer.isAnswerCorrect).length;
    setScore(correctAnswers);
    setShowResult(true);
  };

  if (courses.length === 0) {
    return (
      <WidgetWrapper>
        <Typography variant="h4" color={dark} fontWeight="400">
          Немає доступних курсів
        </Typography>
      </WidgetWrapper>
    );
  } else {
    const course = courses[0];
    const question = course.question[currentQuestionIndex];

    if (showResult) {
      return (
        <WidgetWrapper>
          <Typography variant="h4" color={dark} fontWeight="400">
            {course.courseName}
          </Typography>
          <Typography variant="h5" color={dark} mt="2rem">
            Результат курсу:
          </Typography>
          <Typography variant="h5" color={dark} fontWeight="600">
            Кількість правильних відповідей: {score} / {course.question.length}
          </Typography>
          <Box mt="1rem">
            <Button variant="contained" onClick={() => window.location.reload(false)}>
              Почати знову
            </Button>
          </Box>
        </WidgetWrapper>
      );
    }

    return (
      <WidgetWrapper>
        <Typography variant="h4" color={dark} fontWeight="400">
          {course.courseName}
        </Typography>
        <QuestionWidget
          question={question}
          index={currentQuestionIndex}
          onAnswerSubmit={handleAnswerSubmit}
          disabled={showResult}
        />
        <Box mt="1rem">
          <Button variant="contained" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
            Попереднє питання
          </Button>
          <Button
            variant="contained"
            onClick={currentQuestionIndex === course.question.length - 1 ? handleShowResult : handleNextQuestion}
            disabled={!userAnswers[currentQuestionIndex]}
          >
            {currentQuestionIndex === course.question.length - 1 ? "Завершити курс" : "Наступне питання"}
          </Button>
        </Box>
      </WidgetWrapper>
    );
  }
};

export default CourseWidget;
