import { Box, Typography, useTheme } from "@mui/material";
import { useSelector , useDispatch} from "react-redux";
import {useState, useEffect } from 'react';
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { setCourses } from "state";
import { useNavigate } from "react-router-dom";


const CourseWidget = () => {
    const [courses, setCourses] = useState([]);
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
  
    return (
      <WidgetWrapper>
        {/* Course list */}
        {courses.map((course) => (
          <FlexBetween
            key={course._id}
            gap="0.5rem"
            pb="1.1rem"
            onClick={() => navigate(`/courses/${course._id}`)}
          >
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
              >
                {course.courseName}
              </Typography>
              <Typography variant="body1" color={dark}>
                {course.description}
              </Typography>
            </Box>
            {/* Додайте додаткові елементи або дії для кожного курсу */}
          </FlexBetween>
        ))}
      </WidgetWrapper>
    );
  };

export default CourseWidget;