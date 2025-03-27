import React, { useState, useEffect, useCallback } from "react";
import { Box, useTheme, Typography, Button, Card } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Add } from "@mui/icons-material";
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
} from "../../components/mood/utils/moodUtil";
import { Grid } from "@mui/material";
import {
  GetAllEmotionalStates,
  CreateEmotionalState,
  UpdateEmotionalState,
  DeleteEmotionalState,
  ToggleBookmarkEmotionalState,
  setViewMode,
  setFilterMode,
  setFilterDate,
} from "../../features/emotionalState/emotionalStateSlice";
import DeleteConfirmationModal from "../../components/common/DeleteConfirmationModal";
import { toast } from "react-toastify";

const MoodJournal = () => {
  const dispatch = useDispatch();
  const { entries, loading, error, viewMode, filterMode, filterDate } =
    useSelector((state) => state.emotionalState);
  const [openEntryDialog, setOpenEntryDialog] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState(null);

  const { t } = useTranslation();
  const theme = useTheme();

  useEffect(() => {
    dispatch(GetAllEmotionalStates());
  }, [dispatch]);

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
    dispatch(setFilterMode(newFilter));
  };

  const handleSelectDate = (date) => {
    dispatch(setFilterDate(date));
    dispatch(setViewMode("journal"));
  };

  const handleAddEntry = (formData) => {
    dispatch(CreateEmotionalState(formData))
      .unwrap()
      .then(() => {
        setOpenEntryDialog(false);
        toast.success(t("moodRecordWasSavedSuccessfully"));
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleUpdateEntry = (formData, id) => {
    dispatch(UpdateEmotionalState({ id, entryData: formData }))
      .unwrap()
      .then(() => {
        setEditingEntry(null);
        toast.success(t("moodRecordWasUpdatedSuccessfully"));
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleDeleteClick = (id) => {
    setEntryToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = (id) => {
    dispatch(DeleteEmotionalState(id))
      .unwrap()
      .then(() => {
        toast.success(t("moodRecordWasDeletedSuccessfully"));
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setEntryToDelete(null);
  };

  const handleBookmarkEntry = (id) => {
    dispatch(ToggleBookmarkEmotionalState(id))
      .unwrap()
      .then((response) => {
        const message = response.isBookmarked
          ? t("moodHasBeenBookmarked")
          : t("moodRemovedBookmarked");
        toast.success(message);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry);
  };

  const handleViewModeChange = (newMode) => {
    dispatch(setViewMode(newMode));
  };

  const filteredEntries = getFilteredEntries(entries, filterMode, filterDate);

  if (loading && entries.length === 0) {
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
        onViewModeChange={handleViewModeChange}
        onFilterChange={handleFilterChange}
        onAddNew={() => setOpenEntryDialog(true)}
        patientName={null}
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
                    onDelete={handleDeleteClick}
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

      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        itemId={entryToDelete}
        title={t("deleteMoodEntryTitle")}
        message={t("deleteMoodEntryConfirmation")}
      />
    </Box>
  );
};

const EmptyState = ({ onAddNew }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 3, textAlign: "center", borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        {t("noMoodEntriesFound")}
      </Typography>
      {/* <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {t("addYourFirstMoodEntry")}
      </Typography> */}
      <Button variant="contained" startIcon={<Add />} onClick={onAddNew}>
        {t("addMoodEntry")}
      </Button>
    </Card>
  );
};

export default MoodJournal;
