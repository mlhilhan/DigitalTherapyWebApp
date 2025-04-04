import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import trLocale from "date-fns/locale/tr";
import { useSelector } from "react-redux";

const MoodEntryDialog = ({
  open,
  entry = null,
  onClose,
  onSave,
  moodLevels,
  moodFactors,
  getMoodColor,
  getMoodLabel,
  moodVal,
}) => {
  const { t } = useTranslation();
  const [moodValue, setMoodValue] = useState(moodVal ? moodVal : 3);
  const [moodFactorValues, setMoodFactorValues] = useState([]);
  const [moodNotes, setMoodNotes] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { error, success } = useSelector((state) => state.emotionalState);

  useEffect(() => {
    if (entry) {
      setMoodValue(entry.moodLevel);
      setMoodFactorValues(entry.factors || []);
      setMoodNotes(entry.notes || "");
      setSelectedDate(new Date(entry.date));
      setIsBookmarked(entry.isBookmarked || false);
    } else {
      setMoodValue(moodVal ? moodVal : 3);
      setMoodFactorValues([]);
      setMoodNotes("");
      setSelectedDate(new Date());
      setIsBookmarked(false);
    }
  }, [entry, open]);

  useEffect(() => {
    if (error) {
      setSnackbarOpen(true);
    }
  }, [error]);

  const handleSave = () => {
    const formData = {
      moodLevel: moodValue,
      factors: moodFactorValues,
      notes: moodNotes,
      date: selectedDate.toISOString(),
      isBookmarked: isBookmarked,
    };

    if (entry?.id) {
      onSave(formData, entry.id);
    } else {
      onSave(formData);
    }
  };

  const handleMoodChange = (event, newValue) => {
    if (newValue !== null) {
      setMoodValue(newValue);
    }
  };

  const handleFactorChange = (event) => {
    setMoodFactorValues(event.target.value);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {entry ? t("editMoodEntry") : t("newMoodEntry")}
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              {t("howAreYouFeeling")}
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
                {Object.values(moodLevels)
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
            <Typography
              variant="body1"
              align="center"
              sx={{
                fontWeight: 600,
                color: getMoodColor(moodValue),
              }}
            >
              {getMoodLabel(moodValue)}
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={trLocale}
            >
              <DatePicker
                label={t("date")}
                value={selectedDate}
                onChange={(newDate) => setSelectedDate(newDate)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: "normal",
                  },
                }}
                maxDate={new Date()}
              />
            </LocalizationProvider>
          </Box>

          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="mood-factors-label">
                {t("whatFactorsAffectedYourMood")}
              </InputLabel>
              <Select
                labelId="mood-factors-label"
                multiple
                value={moodFactorValues}
                onChange={handleFactorChange}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={t(value)} size="small" />
                    ))}
                  </Box>
                )}
                sx={{ minHeight: 56 }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 300,
                    },
                  },
                }}
              >
                {moodFactors.map((factor) => (
                  <MenuItem key={factor} value={factor}>
                    {t(factor)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box>
            <TextField
              label={t("notes")}
              multiline
              rows={4}
              fullWidth
              margin="normal"
              value={moodNotes}
              onChange={(e) => setMoodNotes(e.target.value)}
              placeholder={t("writeYourThoughts")}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={onClose}>{t("cancel")}</Button>
          <Button variant="contained" onClick={handleSave} disableElevation>
            {entry ? t("update") : t("save")}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default MoodEntryDialog;
