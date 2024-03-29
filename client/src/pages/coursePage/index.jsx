import { Box, useMediaQuery } from "@mui/material";
import Navbar from "pages/navbar";
import CourseWidget from "pages/widgets/CoourseWidget";


const CoursePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    return (
    <Box>
        <Navbar />
        <Box
            width="100%"
            padding="2rem 6%"
            display={isNonMobileScreens ? "flex" : "block"}
            gap="0.5rem"
            justifyContent="space-between"
        >
            <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                <CourseWidget />
            </Box>
                
        </Box>
    </Box>
    )
}

export default CoursePage;