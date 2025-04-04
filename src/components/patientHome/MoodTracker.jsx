import React, { useState, useCallback } from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  alpha,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { MOOD_LEVELS } from "../mood/utils/moodUtil";

const MoodTracker = ({ onTrackMood, initialMoodValue }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [moodValue, setMoodValue] = useState(initialMoodValue);

  const handleMoodChange = (event, newValue) => {
    if (newValue !== null) {
      setMoodValue(newValue);
    }
  };

  const handleTrackMood = () => {
    onTrackMood(moodValue);
  };

  return (
    <Card
      elevation={0}
      sx={{
        mb: 4,
        borderRadius: 4,
        border: `1px solid ${alpha("#000", 0.05)}`,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {t("howAreYouFeeling")}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {t("trackYourMoodDaily")}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <ToggleButtonGroup
            value={moodValue}
            exclusive
            onChange={handleMoodChange}
            sx={{ mb: 1 }}
          >
            {Object.values(MOOD_LEVELS)
              .sort((a, b) => b.value - a.value)
              .map((mood) => (
                <ToggleButton
                  key={mood.value}
                  value={mood.value}
                  sx={{
                    color: moodValue === mood.value ? "white" : mood.color,
                    bgcolor:
                      moodValue === mood.value ? mood.color : "transparent",
                    "&.Mui-selected": {
                      bgcolor: mood.color,
                      "&:hover": {
                        bgcolor: mood.color,
                      },
                    },
                    p: 1,
                    minWidth: 60,
                  }}
                >
                  {React.cloneElement(mood.icon, {
                    fontSize: "large",
                  })}
                </ToggleButton>
              ))}
          </ToggleButtonGroup>
        </Box>

        <Button
          fullWidth
          variant="outlined"
          color="primary"
          sx={{
            mt: 1,
            borderRadius: 6,
            textTransform: "none",
            py: 1.2,
          }}
          onClick={handleTrackMood}
        >
          {t("trackMood")}
        </Button>
      </CardContent>
    </Card>
  );
};

export default MoodTracker;
