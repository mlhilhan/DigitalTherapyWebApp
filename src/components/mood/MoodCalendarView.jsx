import React, { useMemo } from "react";
import { Card, Typography, Grid, Paper, Avatar, Box } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import {
  format,
  isToday,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
} from "date-fns";
import trLocale from "date-fns/locale/tr";
import { useSelector } from "react-redux";

const MoodCalendarView = ({
  entries,
  onSelectDate,
  getMoodColor,
  getMoodIcon,
}) => {
  const { t } = useTranslation();

  // Takvim verileri
  const calendarData = useMemo(() => {
    // Bu haftanın günleri
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
    const weekEnd = endOfWeek(new Date(), { weekStartsOn: 1 });
    const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

    return weekDays.map((day) => {
      // Bu günün girdileri
      const dayEntries = entries.filter((entry) =>
        isSameDay(new Date(entry.date), day)
      );

      // Eğer girdi varsa, ortalama ruh hali değerini hesapla
      let averageMood = 0;
      if (dayEntries.length > 0) {
        averageMood =
          dayEntries.reduce((sum, entry) => sum + entry.moodLevel, 0) /
          dayEntries.length;
      }

      return {
        date: day,
        entries: dayEntries,
        averageMood: Math.round(averageMood),
      };
    });
  }, [entries]);

  return (
    <Card sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        {t("thisWeeksMood")}
      </Typography>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {calendarData.map((day) => (
          <Grid item xs={12 / 7} key={day.date.toISOString()}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                textAlign: "center",
                borderRadius: 2,
                bgcolor: isToday(day.date)
                  ? "rgba(25, 118, 210, 0.08)"
                  : "background.paper",
                border: isToday(day.date)
                  ? "1px solid"
                  : "1px solid transparent",
                borderColor: isToday(day.date) ? "primary.main" : "divider",
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": {
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  borderColor: "primary.light",
                },
              }}
              onClick={() => onSelectDate(day.date)}
            >
              <Typography
                variant="caption"
                display="block"
                sx={{
                  fontWeight: isToday(day.date) ? 600 : 400,
                  color: isToday(day.date) ? "primary.main" : "text.secondary",
                }}
              >
                {format(day.date, "EEE", { locale: trLocale })}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: isToday(day.date) ? 600 : 400,
                  mb: 1,
                }}
              >
                {format(day.date, "d")}
              </Typography>
              {day.entries.length > 0 ? (
                <Avatar
                  sx={{
                    bgcolor: getMoodColor(day.averageMood),
                    width: 32,
                    height: 32,
                    mx: "auto",
                  }}
                >
                  {getMoodIcon(day.averageMood)}
                </Avatar>
              ) : (
                <Avatar
                  sx={{
                    bgcolor: "action.disabledBackground",
                    width: 32,
                    height: 32,
                    mx: "auto",
                  }}
                >
                  <Add fontSize="small" />
                </Avatar>
              )}
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                {day.entries.length > 0
                  ? `${day.entries.length} ${
                      day.entries.length === 1 ? t("entry") : t("entries")
                    }`
                  : t("noEntries")}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default MoodCalendarView;
