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
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import trLocale from "date-fns/locale/tr";

const MoodJournalHeader = ({
  viewMode,
  filterMode,
  filterDate,
  onViewModeChange,
  onFilterChange,
  onAddNew,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openFilterMenu, setOpenFilterMenu] = useState(null);

  const handleViewModeChange = (event, newMode) => {
    if (newMode) onViewModeChange(newMode);
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
          <Typography variant="h5" fontWeight={600}>
            {t("moodJournal")}
          </Typography>

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
              <ToggleButton value="calendar">
                <Tooltip title={t("calendarView")}>
                  <CalendarMonth />
                </Tooltip>
              </ToggleButton>
              <ToggleButton value="chart">
                <Tooltip title={t("chartView")}>
                  <BarChart />
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
            >
              {t("newEntry")}
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MoodJournalHeader;
