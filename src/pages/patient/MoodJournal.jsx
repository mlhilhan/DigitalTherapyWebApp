import React, { useState, useEffect, useCallback } from "react";
import { Box, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import LoadingComponent, {
  LOADING_TYPES,
} from "../../components/common/LoadingComponent";
import MoodJournalHeader from "../../components/mood/MoodJournalHeader";
import MoodEntryCard from "../../components/mood/MoodEntryCard";
import MoodEntryDialog from "../../components/mood/MoodEntryDialog";
import MoodCalendarView from "../../components/mood/MoodCalendarView";
import MoodChartView from "../../components/mood/MoodChartView";
import {
  MOOD_LEVELS,
  MOOD_FACTORS,
  getMoodColor,
  getMoodIcon,
  formatEntryDate,
  getFilteredEntries,
  generateDummyEntries,
} from "../../components/mood/utils/moodUtil";
import { Grid } from "@mui/material";

const MoodJournal = () => {
  const [viewMode, setViewMode] = useState("journal");
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterMode, setFilterMode] = useState("all");
  const [filterDate, setFilterDate] = useState(null);
  const [openEntryDialog, setOpenEntryDialog] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);

  const { t } = useTranslation();
  const theme = useTheme();

  // dummy data
  useEffect(() => {
    const timer = setTimeout(() => {
      setEntries(generateDummyEntries());
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getMoodLabel = useCallback(
    (moodLevel) => {
      const mood = Object.values(MOOD_LEVELS).find(
        (m) => m.value === moodLevel
      );
      return mood ? t(mood.label) : t(MOOD_LEVELS.NEUTRAL.label);
    },
    [t]
  );

  const formatDate = useCallback(
    (dateString) => {
      return formatEntryDate(dateString, t);
    },
    [t]
  );

  const handleFilterChange = (newFilter) => {
    setFilterMode(newFilter);
    if (newFilter !== "custom") {
      setFilterDate(null);
    }
  };

  const handleSelectDate = (date) => {
    setFilterDate(date);
    setFilterMode("custom");
    setViewMode("journal");
  };

  const handleAddEntry = (formData) => {
    const newEntry = {
      id: entries.length > 0 ? Math.max(...entries.map((e) => e.id)) + 1 : 1,
      ...formData,
      bookmarked: false,
    };
    setEntries([newEntry, ...entries]);
    setOpenEntryDialog(false);
  };

  const handleUpdateEntry = (formData, id) => {
    const updatedEntries = entries.map((entry) =>
      entry.id === id ? { ...entry, ...formData } : entry
    );
    setEntries(updatedEntries);
    setEditingEntry(null);
  };

  const handleDeleteEntry = (id) => {
    if (window.confirm(t("confirmDeleteMoodEntry"))) {
      setEntries(entries.filter((entry) => entry.id !== id));
    }
  };

  const handleBookmarkEntry = (id, isCurrentlyBookmarked) => {
    const updatedEntries = entries.map((entry) =>
      entry.id === id ? { ...entry, bookmarked: !isCurrentlyBookmarked } : entry
    );
    setEntries(updatedEntries);
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry);
  };

  const filteredEntries = getFilteredEntries(entries, filterMode, filterDate);

  if (loading) {
    return <LoadingComponent type={LOADING_TYPES.CARD} count={3} />;
  }

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <MoodJournalHeader
        viewMode={viewMode}
        filterMode={filterMode}
        filterDate={filterDate}
        onViewModeChange={setViewMode}
        onFilterChange={handleFilterChange}
        onAddNew={() => setOpenEntryDialog(true)}
      />

      <Box sx={{ flexGrow: 1, overflow: "auto" }}>
        {viewMode === "journal" &&
          (filteredEntries.length === 0 ? (
            <EmptyState onAddNew={() => setOpenEntryDialog(true)} />
          ) : (
            <Grid container spacing={3}>
              {filteredEntries.map((entry) => (
                <Grid item xs={12} sm={6} md={4} key={entry.id}>
                  <MoodEntryCard
                    entry={entry}
                    onEdit={handleEdit}
                    onDelete={handleDeleteEntry}
                    onBookmark={handleBookmarkEntry}
                    getMoodColor={getMoodColor}
                    getMoodIcon={getMoodIcon}
                    getMoodLabel={getMoodLabel}
                    formatEntryDate={formatDate}
                  />
                </Grid>
              ))}
            </Grid>
          ))}

        {viewMode === "calendar" && (
          <MoodCalendarView
            entries={entries}
            onSelectDate={handleSelectDate}
            getMoodColor={getMoodColor}
            getMoodIcon={getMoodIcon}
          />
        )}

        {viewMode === "chart" && (
          <MoodChartView
            entries={entries}
            onAddNew={() => setOpenEntryDialog(true)}
            getMoodLabel={getMoodLabel}
            theme={theme}
          />
        )}
      </Box>

      {openEntryDialog && (
        <MoodEntryDialog
          open={openEntryDialog}
          entry={null}
          onClose={() => setOpenEntryDialog(false)}
          onSave={handleAddEntry}
          moodLevels={MOOD_LEVELS}
          moodFactors={MOOD_FACTORS}
          getMoodColor={getMoodColor}
          getMoodLabel={getMoodLabel}
        />
      )}

      {editingEntry && (
        <MoodEntryDialog
          open={!!editingEntry}
          entry={editingEntry}
          onClose={() => setEditingEntry(null)}
          onSave={handleUpdateEntry}
          moodLevels={MOOD_LEVELS}
          moodFactors={MOOD_FACTORS}
          getMoodColor={getMoodColor}
          getMoodLabel={getMoodLabel}
        />
      )}
    </Box>
  );
};

// Boş durum bileşeni
const EmptyState = ({ onAddNew }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 3, textAlign: "center", borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        {t("noMoodEntriesFound")}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {t("addYourFirstMoodEntry")}
      </Typography>
      <Button variant="contained" startIcon={<Add />} onClick={onAddNew}>
        {t("addMoodEntry")}
      </Button>
    </Card>
  );
};

export default MoodJournal;
