import { Box, useMediaQuery } from "@mui/material";
import Navbar from "pages/navbar";
import CourseWidget from "pages/widgets/CoourseWidget";
import UserWidget from "pages/widgets/UserWidget";
import { useSelector } from "react-redux";


const MainPage = () => {

    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const {_id} = useSelector((state) => state.user);


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
                <UserWidget userId={_id} />
                <CourseWidget/>
            </Box>
        </Box>
    </Box>
    )
}

export default MainPage;
