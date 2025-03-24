import React, { useState, useEffect, useCallback } from "react";
import {
  Paper,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
  Fade,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import LanguageIcon from "@mui/icons-material/Language";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import appLanguages from "../../config/appLanguages";

const infoSlides = [
  {
    title: "digitalTherapyAssistant",
    description: "appDescription",
    image: "/assets/images/info-1.svg",
  },
  {
    title: "trackYourMood",
    description: "trackMoodDescription",
    image: "/assets/images/info-2.svg",
  },
  {
    title: "personalizedInsights",
    description: "insightsDescription",
    image: "/assets/images/info-3.svg",
  },
  {
    title: "professionalSupport",
    description: "supportDescription",
    image: "/assets/images/info-4.svg",
  },
];

const AuthLayout = ({ children }) => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleLanguageIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageSelect = (langCode) => {
    i18n.changeLanguage(langCode);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNextClick = (e) => {
    e.stopPropagation();
    nextSlide();
  };

  const handlePrevClick = (e) => {
    e.stopPropagation();
    prevSlide();
  };

  const nextSlide = React.useCallback(() => {
    setActiveSlide((prev) => (prev === infoSlides.length - 1 ? 0 : prev + 1));
  }, [infoSlides.length]);

  const prevSlide = React.useCallback(() => {
    setActiveSlide((prev) => (prev === 0 ? infoSlides.length - 1 : prev - 1));
  }, [infoSlides.length]);

  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  const handleKeyDown = React.useCallback(
    (e) => {
      if (e.key === "ArrowRight") {
        setActiveSlide((prev) =>
          prev === infoSlides.length - 1 ? 0 : prev + 1
        );
      } else if (e.key === "ArrowLeft") {
        setActiveSlide((prev) =>
          prev === 0 ? infoSlides.length - 1 : prev - 1
        );
      }
    },
    [infoSlides.length]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isMobile ? "column-reverse" : "row",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          zIndex: 10,
        }}
      >
        <IconButton
          onClick={handleLanguageIconClick}
          aria-controls={open ? "language-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          sx={{
            color: "white",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.3)",
            },
          }}
        >
          <LanguageIcon />
        </IconButton>
        <Menu
          id="language-menu"
          MenuListProps={{
            "aria-labelledby": "language-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          {appLanguages.map((lang) => (
            <MenuItem
              key={lang.value}
              onClick={() => handleLanguageSelect(lang.value)}
              selected={i18n.language === lang.value}
            >
              {lang.label}
            </MenuItem>
          ))}
        </Menu>
      </div>

      {/* Left side - Form */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f9f9fd",
          padding: "20px",
          minHeight: isMobile ? "60vh" : "100vh",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Paper
          elevation={4}
          sx={{
            padding: "32px",
            borderRadius: "16px",
            width: "100%",
            maxWidth: "450px",
            margin: isMobile ? "40px 0" : 0,
            boxShadow: "0 8px 24px rgba(98, 0, 238, 0.12)",
            border: "1px solid rgba(98, 0, 238, 0.08)",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              boxShadow: "0 12px 32px rgba(98, 0, 238, 0.16)",
            },
          }}
        >
          {children}
        </Paper>
      </div>

      {/* Right side - Info Carousel */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #6200EE 0%, #9D50BB 100%)",
          color: "white",
          padding: "40px 20px",
          minHeight: isMobile ? "40vh" : "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
            top: "-50px",
            right: "-100px",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
            bottom: "50px",
            left: "-50px",
          }}
        />

        {/* Carousel Container */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "600px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            zIndex: 2,
            padding: "20px",
            overflow: "visible",
          }}
        >
          {/* Carousel navigation */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              position: "absolute",
              top: "50%",
              left: 0,
              transform: "translateY(-50%)",
              px: 2,
              zIndex: 5,
            }}
          >
            <IconButton
              onClick={handlePrevClick}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                color: "white",
                width: "48px",
                height: "48px",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                },
              }}
              aria-label="previous"
              size="large"
            >
              <KeyboardArrowLeftIcon fontSize="large" />
            </IconButton>

            <IconButton
              onClick={handleNextClick}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                color: "white",
                width: "48px",
                height: "48px",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                },
              }}
              aria-label="next"
              size="large"
            >
              <KeyboardArrowRightIcon fontSize="large" />
            </IconButton>
          </Box>

          {/* Carousel slides */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              height: "100%",
              width: "100%",
            }}
          >
            {infoSlides.map((slide, index) => (
              <Box
                key={index}
                sx={{
                  position: "absolute",
                  opacity: activeSlide === index ? 1 : 0,
                  visibility: activeSlide === index ? "visible" : "hidden",
                  transition:
                    "opacity 0.5s ease-in-out, visibility 0.5s ease-in-out",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  px: 4,
                }}
              >
                {/* Placeholder for image */}
                <Box
                  sx={{
                    width: "200px",
                    height: "200px",
                    mb: 4,
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={slide.image}
                    alt={t(slide.title)}
                    style={{ maxWidth: "80%", maxHeight: "80%" }}
                    onError={(e) => {
                      e.target.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cpath d='M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3'%3E%3C/path%3E%3Cline x1='12' y1='17' x2='12.01' y2='17'%3E%3C/line%3E%3C/svg%3E";
                    }}
                  />
                </Box>

                <Typography
                  variant={isMobile ? "h4" : "h3"}
                  component="h2"
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                    letterSpacing: "-0.5px",
                  }}
                >
                  {t(slide.title)}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    marginTop: "16px",
                    fontSize: "1.1rem",
                    opacity: 0.9,
                    lineHeight: 1.6,
                    maxWidth: "450px",
                  }}
                >
                  {t(slide.description)}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Carousel indicators */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              position: "absolute",
              bottom: "40px",
              width: "100%",
              gap: 1,
            }}
          >
            {infoSlides.map((_, index) => (
              <IconButton
                key={index}
                onClick={() => goToSlide(index)}
                size="small"
                sx={{
                  p: 0.5,
                  color:
                    activeSlide === index
                      ? "white"
                      : "rgba(255, 255, 255, 0.5)",
                  transform: activeSlide === index ? "scale(1.2)" : "scale(1)",
                  transition: "all 0.2s ease-in-out",
                }}
              >
                <FiberManualRecordIcon
                  fontSize="small"
                  sx={{
                    fontSize: activeSlide === index ? 12 : 10,
                  }}
                />
              </IconButton>
            ))}
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default AuthLayout;
