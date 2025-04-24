import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  IconButton,
  Tooltip,
  ToggleButtonGroup,
  ToggleButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Add,
  FilterList,
  Timeline,
  CalendarMonth,
  BarChart,
  Lock,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import trLocale from "date-fns/locale/tr";
import { useSelector } from "react-redux";

const MoodJournalHeader = ({
  viewMode,
  filterMode,
  filterDate,
  onViewModeChange,
  onFilterChange,
  onAddNew,
  patientName,
  hasAdvancedViewsAccess,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openFilterMenu, setOpenFilterMenu] = useState(null);
  const { loading } = useSelector((state) => state.emotionalState);

  const handleViewModeChange = (event, newMode) => {
    if (newMode !== null) {
      onViewModeChange(newMode);
    }
  };

  const handleFilterMenuOpen = (event) => {
    setOpenFilterMenu(event.currentTarget);
  };

  const handleFilterMenuClose = () => {
    setOpenFilterMenu(null);
  };

  const handleFilterChange = (newFilter) => {
    onFilterChange(newFilter);
    handleFilterMenuClose();
  };

  return (
    <Card
      elevation={2}
      sx={{
        mb: 3,
        borderRadius: 2,
        backgroundColor: "white",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              borderLeft: `4px solid ${theme.palette.primary.main}`,
              pl: 1.5,
            }}
          >
            <Typography variant="h5" fontWeight={600} sx={{ lineHeight: 1.2 }}>
              {t("greetingWithName")}, {patientName}
              <Typography
                component="span"
                variant="subtitle1"
                color="text.secondary"
                sx={{ display: "block", fontWeight: 400, fontSize: "0.85rem" }}
              >
                {t("trackYourEmotionalJourney")}
              </Typography>
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {viewMode === "journal" && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  backgroundColor: theme.palette.grey[100],
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  display: { xs: "none", sm: "block" },
                }}
              >
                {filterMode === "all" && t("filterNone")}
                {filterMode === "today" && t("filterToday")}
                {filterMode === "week" && t("filterThisWeek")}
                {filterMode === "month" && t("filterThisMonth")}
                {filterMode === "bookmarked" && t("filterBookmarked")}
                {filterMode === "custom" &&
                  filterDate &&
                  format(filterDate, "PP", { locale: trLocale })}
              </Typography>
            )}

            <Box sx={{ display: "flex", gap: 1 }}>
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={handleViewModeChange}
                size={isMobile ? "small" : "medium"}
                sx={{ mr: 1 }}
              >
                <ToggleButton value="journal">
                  <Tooltip title={t("journalView")}>
                    <Timeline />
                  </Tooltip>
                </ToggleButton>

                <ToggleButton
                  value="calendar"
                  disabled={!hasAdvancedViewsAccess}
                >
                  <Tooltip
                    title={
                      hasAdvancedViewsAccess
                        ? t("calendarView")
                        : t("upgradeToAccessCalendarView")
                    }
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {!hasAdvancedViewsAccess && (
                        <Lock fontSize="small" sx={{ mr: 0.5, fontSize: 14 }} />
                      )}
                      <CalendarMonth />
                    </Box>
                  </Tooltip>
                </ToggleButton>

                <ToggleButton value="chart" disabled={!hasAdvancedViewsAccess}>
                  <Tooltip
                    title={
                      hasAdvancedViewsAccess
                        ? t("chartView")
                        : t("upgradeToAccessChartView")
                    }
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {!hasAdvancedViewsAccess && (
                        <Lock fontSize="small" sx={{ mr: 0.5, fontSize: 14 }} />
                      )}
                      <BarChart />
                    </Box>
                  </Tooltip>
                </ToggleButton>
              </ToggleButtonGroup>

              <Box>
                <Tooltip title={t("filter")}>
                  <IconButton
                    onClick={handleFilterMenuOpen}
                    color={filterMode !== "all" ? "primary" : "default"}
                    size={isMobile ? "small" : "medium"}
                  >
                    <FilterList />
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={openFilterMenu}
                  open={Boolean(openFilterMenu)}
                  onClose={handleFilterMenuClose}
                >
                  <MenuItem
                    selected={filterMode === "all"}
                    onClick={() => handleFilterChange("all")}
                  >
                    {t("allEntries")}
                  </MenuItem>
                  <MenuItem
                    selected={filterMode === "today"}
                    onClick={() => handleFilterChange("today")}
                  >
                    {t("today")}
                  </MenuItem>
                  <MenuItem
                    selected={filterMode === "week"}
                    onClick={() => handleFilterChange("week")}
                  >
                    {t("thisWeek")}
                  </MenuItem>
                  <MenuItem
                    selected={filterMode === "month"}
                    onClick={() => handleFilterChange("month")}
                  >
                    {t("thisMonth")}
                  </MenuItem>
                  <MenuItem
                    selected={filterMode === "bookmarked"}
                    onClick={() => handleFilterChange("bookmarked")}
                  >
                    {t("bookmarked")}
                  </MenuItem>
                  {filterDate && (
                    <MenuItem
                      selected={filterMode === "custom"}
                      onClick={() => handleFilterChange("custom")}
                    >
                      {format(filterDate, "PPP", { locale: trLocale })}
                    </MenuItem>
                  )}
                </Menu>
              </Box>

              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={onAddNew}
                size={isMobile ? "small" : "medium"}
                disabled={loading}
              >
                {t("newEntry")}
              </Button>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MoodJournalHeader;
