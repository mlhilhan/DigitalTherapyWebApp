import React, { useState, useEffect, useCallback } from "react";
import { Box, useTheme, Typography, Button, Card, Alert } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
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
  clearEmotionalStateError,
} from "../../features/emotionalState/emotionalStateSlice";
import DeleteConfirmationModal from "../../components/common/DeleteConfirmationModal";
import NotificationSnackbar from "../../components/common/NotificationSnackbar";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import { isToday } from "date-fns";
import { useSubscriptionFeature } from "../../hooks/useSubscriptionFeature";

const MoodJournal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { entries, loading, error, viewMode, filterMode, filterDate } =
    useSelector((state) => state.emotionalState);
  const [openEntryDialog, setOpenEntryDialog] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState(null);
  const { profile } = useSelector((state) => state.profile);
  const [patientFullName, setPatientFullName] = useState("");
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [confirmModalProps, setConfirmModalProps] = useState({
    open: false,
    onConfirm: () => {},
    itemId: null,
    title: "",
    message: "",
    confirmButtonText: "",
    cancelButtonText: "",
    confirmColor: "primary",
    type: "warning",
    warningMessage: "",
  });
  const { t } = useTranslation();
  const theme = useTheme();

  const {
    hasAccess: hasAdvancedViewsAccess,
    limit: moodEntryLimit,
    isUnlimited,
    currentPlan,
  } = useSubscriptionFeature("mood_entry");

  const canAddEntryForDate = useCallback(
    (date) => {
      if (isUnlimited) return true;

      const effectiveLimit = moodEntryLimit <= 0 ? 1 : moodEntryLimit;

      const targetDate = date ? new Date(date) : new Date();

      const activeEntriesForDate = entries.filter((entry) => {
        const entryDate = new Date(entry.date);
        return (
          entryDate.toDateString() === targetDate.toDateString() &&
          entry.isDeleted === false
        );
      });

      return activeEntriesForDate.length < effectiveLimit;
    },
    [entries, isUnlimited, moodEntryLimit]
  );

  const canAddMoreEntries = canAddEntryForDate(new Date());

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

  const handleAddEntryClick = () => {
    dispatch(clearEmotionalStateError());
    setOpenEntryDialog(true);
  };

  const handleCloseEntryDialog = () => {
    dispatch(clearEmotionalStateError());
    setOpenEntryDialog(false);
  };

  const handleCloseEditDialog = () => {
    dispatch(clearEmotionalStateError());
    setEditingEntry(null);
  };

  const handleAddEntry = (formData) => {
    if (!canAddEntryForDate(new Date(formData.date))) {
      setNotification({
        open: true,
        message: t("dailyLimitReachedForSelectedDate"),
        severity: "error",
      });
      return;
    }

    dispatch(CreateEmotionalState(formData))
      .unwrap()
      .then(() => {
        setOpenEntryDialog(false);
        setNotification({
          open: true,
          message: t("moodRecordWasSavedSuccessfully"),
          severity: "success",
        });
      })
      .catch((error) => {
        debugger;
        const errorMessage = error.includes("daily limit")
          ? t("dailyLimitReachedForSelectedDate")
          : error;

        setNotification({
          open: true,
          message: errorMessage,
          severity: "error",
        });
      });
  };

  const handleUpdateEntry = (formData, id) => {
    dispatch(UpdateEmotionalState({ id, entryData: formData }))
      .unwrap()
      .then(() => {
        setEditingEntry(null);
        setNotification({
          open: true,
          message: t("moodRecordWasUpdatedSuccessfully"),
          severity: "success",
        });
      })
      .catch((error) => {
        setNotification({
          open: true,
          message: error,
          severity: "error",
        });
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
        setNotification({
          open: true,
          message: t("moodRecordWasDeletedSuccessfully"),
          severity: "success",
        });

        dispatch(GetAllEmotionalStates());
      })
      .catch((error) => {
        setNotification({
          open: true,
          message: error,
          severity: "error",
        });
      });
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setEntryToDelete(null);
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
    dispatch(clearEmotionalStateError());
  };

  const handleBookmarkEntry = (id) => {
    dispatch(ToggleBookmarkEmotionalState(id))
      .unwrap()
      .then((response) => {
        const message = response.isBookmarked
          ? t("moodHasBeenBookmarked")
          : t("moodRemovedBookmarked");
        setNotification({
          open: true,
          message: message,
          severity: "success",
        });
      })
      .catch((error) => {
        setNotification({
          open: true,
          message: error,
          severity: "error",
        });
      });
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry);
  };

  const handleViewModeChange = (newMode) => {
    if (newMode !== "journal" && !hasAdvancedViewsAccess) {
      setConfirmModalProps({
        open: true,
        itemId: null,
        title: t("premiumFeature"),
        message: t("advancedViewsRequirePremium"),
        confirmButtonText: t("upgradePlan"),
        cancelButtonText: t("cancel"),
        confirmColor: "primary",
        type: "info",
        onConfirm: () => {
          navigate("/patient-dashboard/subscription-plans");
        },
      });
      return;
    }

    dispatch(setViewMode(newMode));
  };

  const filteredEntries = getFilteredEntries(entries, filterMode, filterDate);

  useEffect(() => {
    dispatch(GetAllEmotionalStates());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      const fullName = `${profile.firstName || ""} ${
        profile?.lastName || ""
      }`.trim();
      setPatientFullName(fullName);
    }
  }, [profile]);

  useEffect(() => {
    if (error) {
      setNotification({
        open: true,
        message: error,
        severity: "error",
      });
    }
  }, [error]);

  useEffect(() => {
    if (hasAdvancedViewsAccess === false) {
      dispatch(setViewMode("journal"));
    }
  }, [hasAdvancedViewsAccess, dispatch]);

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
        onAddNew={handleAddEntryClick}
        patientName={patientFullName}
        hasAdvancedViewsAccess={hasAdvancedViewsAccess}
      />

      {!canAddMoreEntries && viewMode === "journal" && (
        <Alert
          severity="info"
          sx={{ mb: 3 }}
          action={
            <Button
              color="primary"
              size="small"
              onClick={() => navigate("/patient-dashboard/subscription-plans")}
            >
              {t("upgradePlan")}
            </Button>
          }
        >
          {t("dailyMoodEntryLimitReached")}
        </Alert>
      )}

      <Box sx={{ flexGrow: 1, overflow: "auto" }}>
        {viewMode === "journal" &&
          (filteredEntries.length === 0 ? (
            <EmptyState onAddNew={handleAddEntryClick} />
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

        {viewMode === "calendar" && hasAdvancedViewsAccess && (
          <MoodCalendarView
            entries={entries}
            onSelectDate={handleSelectDate}
            getMoodColor={getMoodColor}
            getMoodIcon={getMoodIcon}
          />
        )}

        {viewMode === "chart" && hasAdvancedViewsAccess && (
          <MoodChartView
            entries={entries}
            onAddNew={handleAddEntryClick}
            getMoodLabel={getMoodLabel}
            theme={theme}
          />
        )}

        {viewMode !== "journal" && !hasAdvancedViewsAccess && (
          <Card sx={{ p: 4, textAlign: "center", borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>
              {t("premiumFeature")}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {t("upgradeToAccessAdvancedViews")}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/patient-dashboard/subscription-plans")}
            >
              {t("seeSubscriptionPlans")}
            </Button>
          </Card>
        )}
      </Box>

      {openEntryDialog && (
        <MoodEntryDialog
          open={openEntryDialog}
          entry={null}
          onClose={handleCloseEntryDialog}
          onSave={handleAddEntry}
          onError={(message) =>
            setNotification({
              open: true,
              message: message,
              severity: "error",
            })
          }
          canAddForDate={canAddEntryForDate}
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
          onClose={handleCloseEditDialog}
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

      <ConfirmationModal
        open={confirmModalProps.open}
        onClose={() =>
          setConfirmModalProps({ ...confirmModalProps, open: false })
        }
        onConfirm={confirmModalProps.onConfirm}
        itemId={confirmModalProps.itemId}
        title={confirmModalProps.title}
        message={confirmModalProps.message}
        confirmButtonText={confirmModalProps.confirmButtonText}
        cancelButtonText={confirmModalProps.cancelButtonText}
        confirmColor={confirmModalProps.confirmColor}
        type={confirmModalProps.type}
        warningMessage={confirmModalProps.warningMessage}
      />

      <NotificationSnackbar
        open={notification.open}
        onClose={handleCloseNotification}
        message={notification.message}
        severity={notification.severity}
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
      <Button variant="contained" startIcon={<Add />} onClick={onAddNew}>
        {t("addMoodEntry")}
      </Button>
    </Card>
  );
};

export default MoodJournal;
