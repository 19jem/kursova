import { Box, Typography, useTheme, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useNavigate } from "react-router-dom";
import QuestionWidget from "./QuestionWidget";

const CourseWidget = () => {
  const [courses, setCourses] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const { palette } = useTheme();
  const navigate = useNavigate();
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

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleAnswerSubmit = (selectedOption) => {
    setUserAnswers([...userAnswers, selectedOption]);
  };

  if (courses.length === 0) {
    return (
      <WidgetWrapper>
        <FlexBetween>
          <Box>
            <Typography variant="h4" color={dark} fontWeight="400">
              Немає доступних курсів
            </Typography>
          </Box>
        </FlexBetween>
      </WidgetWrapper>
    );
  } else {
    const course = courses[0]; // Показуємо лише перший курс

    const question = course.question[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === course.question.length - 1;

    const correctAnswersCount = userAnswers.filter(
      (answer, index) => answer === course.question[index].correctAnswer
    ).length;
    const totalAnswersCount = userAnswers.length;

    const handleFinishCourse = () => {
      // Handle finishing the course
      // Display correctAnswersCount and totalAnswersCount to the user
    };

    return (
      <WidgetWrapper>
        <FlexBetween gap="0.5rem" pb="1.1rem">
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
              onClick={() => navigate(`/courses/${course._id}`)}
            >
              {course.courseName}
            </Typography>
            <Typography variant="standard" color={dark} fontWeight="500">
              {course.description}
            </Typography>
            <QuestionWidget
              question={question}
              onAnswerSubmit={handleAnswerSubmit}
              disabled={false}
              userAnswers={userAnswers}
            />
            <Box mt="1rem">
              <Button
                variant="contained"
                disabled={currentQuestionIndex === 0}
                onClick={handlePreviousQuestion}
              >
                Назад
              </Button>
              <Button
                variant="contained"
                disabled={currentQuestionIndex === course.question.length - 1}
                onClick={handleNextQuestion}
                sx={{ marginLeft: "1rem" }}
              >
                Вперед
              </Button>
              {isLastQuestion && (
                <Button
                  variant="contained"
                  onClick={handleFinishCourse}
                  sx={{ marginLeft: "1rem" }}
                >
                  Завершити курс
                </Button>
              )}
            </Box>
          </Box>
        </FlexBetween>
      </WidgetWrapper>
    );
  }
};

export default CourseWidget;
