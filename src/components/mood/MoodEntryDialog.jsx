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
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import trLocale from "date-fns/locale/tr";

const MoodEntryDialog = ({
  open,
  entry = null, // null ise yeni girdi, değilse düzenleme
  onClose,
  onSave,
  moodLevels,
  moodFactors,
  getMoodColor,
  getMoodLabel,
}) => {
  const { t } = useTranslation();
  const [moodValue, setMoodValue] = useState(3);
  const [moodFactorValues, setMoodFactorValues] = useState([]);
  const [moodNotes, setMoodNotes] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Eğer entry varsa formu doldur
  useEffect(() => {
    if (entry) {
      setMoodValue(entry.mood);
      setMoodFactorValues(entry.factors || []);
      setMoodNotes(entry.notes || "");
      setSelectedDate(new Date(entry.date));
    } else {
      // Yeni girdi için varsayılan değerler
      setMoodValue(3);
      setMoodFactorValues([]);
      setMoodNotes("");
      setSelectedDate(new Date());
    }
  }, [entry, open]);

  const handleSave = () => {
    const formData = {
      mood: moodValue,
      factors: moodFactorValues,
      notes: moodNotes,
      date: selectedDate.toISOString(),
    };

    onSave(formData, entry?.id);
  };

  const handleMoodChange = (event, newValue) => {
    if (newValue !== null) {
      setMoodValue(newValue);
    }
  };

  const handleFactorChange = (event) => {
    setMoodFactorValues(event.target.value);
  };

  return (
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
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
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
  );
};

export default MoodEntryDialog;
