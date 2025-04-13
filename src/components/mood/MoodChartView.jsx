import React, { useMemo } from "react";
import { Card, Typography, Box, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { format, subMonths } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";

const MoodChartView = ({ entries, onAddNew, getMoodLabel, theme }) => {
  const { t } = useTranslation();
  const { statistics } = useSelector((state) => state.emotionalState);

  const chartData = useMemo(() => {
    if (!entries || entries.length === 0) return [];

    const lastMonthEntries = entries
      .filter((entry) => new Date(entry.date) >= subMonths(new Date(), 1))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    return lastMonthEntries.map((entry) => ({
      date: format(new Date(entry.date), "MM.dd"),
      mood: entry.moodLevel,
      notes: entry.notes,
    }));
  }, [entries]);

  const renderStatistics = () => {
    if (!statistics) return null;

    return (
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          {t("moodStatistics")}
        </Typography>
        <Typography variant="body2">
          {t("averageMood")}: {statistics.averageMood.toFixed(1)}
        </Typography>
        <Typography variant="body2">
          {t("totalEntries")}: {statistics.totalEntries}
        </Typography>

        {statistics.factorFrequency &&
          Object.keys(statistics.factorFrequency).length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                {t("mostCommonFactors")}:
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {Object.entries(statistics.factorFrequency)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 3)
                  .map(([factor, count]) => (
                    <Typography key={factor} variant="body2">
                      {t(factor)}: {count}
                    </Typography>
                  ))}
              </Box>
            </Box>
          )}
      </Box>
    );
  };

  return (
    <Card sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        {t("moodTrends")}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {t("lastMonthMoodChanges")}
      </Typography>

      {renderStatistics()}

      <Box sx={{ width: "100%", height: 300 }}>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis
                domain={[1, 5]}
                ticks={[1, 2, 3, 4, 5]}
                tickFormatter={(tick) => getMoodLabel(tick)}
              />
              <RechartsTooltip
                formatter={(value, name) => [getMoodLabel(value), t("mood")]}
                labelFormatter={(label) => t("date") + ": " + label}
              />
              <Line
                type="monotone"
                dataKey="mood"
                stroke={theme.palette.primary.main}
                strokeWidth={2}
                dot={{ r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="body1" sx={{ mb: 2 }}>
              {t("noMoodEntriesFound")}
            </Typography>
            <Button variant="contained" startIcon={<Add />} onClick={onAddNew}>
              {t("addMoodEntry")}
            </Button>
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default MoodChartView;
