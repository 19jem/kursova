import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";


const LoginPage = () => {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px");

    return <Box>
    <Box 
        widht="100%" 
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        >
        <Typography
            textAlign="center"
            fontWeight="bold"
            fontSize="clamp(1rem, 2rem, 2.25rem)"
            color="primary"
        >
            HTMLCourse
        </Typography>
    </Box>
     <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
     >
        <Typography  fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
            Гарного дня, дякуємо за відвідування HTMLCoourse!
        </Typography>
        <Form />

     </Box>
    </Box>
}

export default LoginPage;