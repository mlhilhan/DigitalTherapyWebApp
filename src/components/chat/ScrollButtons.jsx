import React from "react";
import { Box, Fab, Zoom, Tooltip } from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const ScrollButtons = ({ containerRef }) => {
  const { t } = useTranslation();
  const [showScrollButtons, setShowScrollButtons] = React.useState(false);
  const [showScrollTop, setShowScrollTop] = React.useState(false);
  const [showScrollBottom, setShowScrollBottom] = React.useState(true);

  React.useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const handleScroll = () => {
      // Scroll pozisyonunu kontrol et
      const isNotAtTop = container.scrollTop > 100;
      const isNotAtBottom =
        container.scrollTop <
        container.scrollHeight - container.clientHeight - 100;

      // Scrollable içerik var mı kontrol et
      const isScrollable = container.scrollHeight > container.clientHeight + 50;

      setShowScrollTop(isNotAtTop);
      setShowScrollBottom(isNotAtBottom);
      setShowScrollButtons(isScrollable);
    };

    // İlk yükleme kontrolü
    handleScroll();

    // Scroll event listener ekle
    container.addEventListener("scroll", handleScroll);

    // Window resize dinle, içerik yüksekliği değişebilir
    window.addEventListener("resize", handleScroll);

    // Component unmount olduğunda listener'ları kaldır
    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [containerRef]);

  const scrollToTop = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const scrollToBottom = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  if (!showScrollButtons) return null;

  return (
    <Box
      sx={{
        position: "absolute",
        right: 20,
        bottom: 90,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        zIndex: 1000, // Daha yüksek bir z-index değeri
      }}
    >
      <Zoom in={showScrollTop}>
        <Tooltip title={t("scrollToTop")} placement="left">
          <Fab
            color="primary"
            size="small"
            onClick={scrollToTop}
            sx={{
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              opacity: 0.9,
              "&:hover": {
                opacity: 1,
                transform: "translateY(-2px)",
                boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
              },
              transition: "all 0.2s ease",
            }}
          >
            <KeyboardArrowUp />
          </Fab>
        </Tooltip>
      </Zoom>

      <Zoom in={showScrollBottom}>
        <Tooltip title={t("scrollToBottom")} placement="left">
          <Fab
            color="primary"
            size="small"
            onClick={scrollToBottom}
            sx={{
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              opacity: 0.9,
              "&:hover": {
                opacity: 1,
                transform: "translateY(2px)",
                boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
              },
              transition: "all 0.2s ease",
            }}
          >
            <KeyboardArrowDown />
          </Fab>
        </Tooltip>
      </Zoom>
    </Box>
  );
};

export default ScrollButtons;
