import React from "react";
import {
  Box,
  Skeleton,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Paper,
} from "@mui/material";

export const LOADING_TYPES = {
  PROFILE: "profile",
  CHAT: "chat",
  TABLE: "table",
  CARD: "card",
  DEFAULT: "default",
};

/**
 * @param {Object} props - Component props
 * @param {string} props.type - Loading tipi (profile, chat, table, card, default)
 * @param {number} props.count - Kaç adet loading item gösterilecek (tablo ve kart için)
 * @param {Object} props.sx - Ekstra stil özellikleri
 */

const LoadingComponent = ({
  type = LOADING_TYPES.DEFAULT,
  count = 3,
  sx = {},
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const renderProfileLoading = () => (
    <Card
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        width: "100%",
        ...sx,
      }}
    >
      <Skeleton variant="rectangular" height={200} />
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Skeleton variant="circular" width={80} height={80} sx={{ mr: 2 }} />
          <Box>
            <Skeleton variant="text" width={180} height={40} />
            <Skeleton variant="text" width={100} height={24} />
          </Box>
        </Box>
        <Skeleton
          variant="rectangular"
          height={120}
          sx={{ borderRadius: 2, mb: 3 }}
        />

        <Box sx={{ mb: 3 }}>
          <Skeleton variant="text" width={120} height={24} sx={{ mb: 1 }} />
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <Skeleton
              variant="rectangular"
              width="48%"
              height={80}
              sx={{ borderRadius: 2 }}
            />
            <Skeleton
              variant="rectangular"
              width="48%"
              height={80}
              sx={{ borderRadius: 2 }}
            />
            <Skeleton
              variant="rectangular"
              width="48%"
              height={80}
              sx={{ borderRadius: 2 }}
            />
            <Skeleton
              variant="rectangular"
              width="48%"
              height={80}
              sx={{ borderRadius: 2 }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const renderChatLoading = () => (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        ...sx,
      }}
    >
      <Card sx={{ mb: 2, borderRadius: 2 }}>
        <CardContent sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Skeleton
                variant="circular"
                width={48}
                height={48}
                sx={{ mr: 2 }}
              />
              <Box>
                <Skeleton variant="text" width={180} height={28} />
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Skeleton
                    variant="rectangular"
                    width={50}
                    height={16}
                    sx={{ borderRadius: 1 }}
                  />
                  <Skeleton variant="text" width={100} height={16} />
                </Box>
              </Box>
            </Box>
            <Skeleton variant="circular" width={32} height={32} />
          </Box>
        </CardContent>
      </Card>

      <Box sx={{ mb: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
        <Skeleton
          variant="rectangular"
          width={120}
          height={32}
          sx={{ borderRadius: 16 }}
        />
        <Skeleton
          variant="rectangular"
          width={150}
          height={32}
          sx={{ borderRadius: 16 }}
        />
        <Skeleton
          variant="rectangular"
          width={100}
          height={32}
          sx={{ borderRadius: 16 }}
        />
        <Skeleton
          variant="rectangular"
          width={130}
          height={32}
          sx={{ borderRadius: 16 }}
        />
      </Box>

      <Paper
        sx={{
          flexGrow: 1,
          p: 2,
          mb: 2,
          borderRadius: 2,
          bgcolor: "rgb(249, 250, 251)",
        }}
      >
        <Box sx={{ display: "flex", mb: 3 }}>
          <Skeleton variant="circular" width={36} height={36} sx={{ mr: 1 }} />
          <Box sx={{ maxWidth: "70%" }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
              <Skeleton variant="text" width={60} height={16} />
              <Skeleton variant="text" width={40} height={16} sx={{ ml: 1 }} />
            </Box>
            <Skeleton
              variant="rectangular"
              height={80}
              width="100%"
              sx={{ borderRadius: 2 }}
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
          <Box
            sx={{
              maxWidth: "70%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
              <Skeleton variant="text" width={40} height={16} sx={{ mr: 1 }} />
              <Skeleton variant="text" width={60} height={16} />
            </Box>
            <Skeleton
              variant="rectangular"
              height={60}
              width="100%"
              sx={{ borderRadius: 2, bgcolor: theme.palette.primary.light }}
            />
          </Box>
          <Skeleton variant="circular" width={36} height={36} sx={{ ml: 1 }} />
        </Box>

        <Box sx={{ display: "flex", mb: 3 }}>
          <Skeleton variant="circular" width={36} height={36} sx={{ mr: 1 }} />
          <Box sx={{ maxWidth: "70%" }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
              <Skeleton variant="text" width={60} height={16} />
              <Skeleton variant="text" width={40} height={16} sx={{ ml: 1 }} />
            </Box>
            <Skeleton
              variant="rectangular"
              height={100}
              width="100%"
              sx={{ borderRadius: 2 }}
            />
          </Box>
        </Box>
      </Paper>

      <Paper sx={{ p: 2, borderRadius: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Skeleton
            variant="rectangular"
            height={56}
            width="85%"
            sx={{ borderRadius: 2, mr: 1 }}
          />
          <Skeleton
            variant="rectangular"
            height={40}
            width="15%"
            sx={{ borderRadius: 2 }}
          />
        </Box>
      </Paper>
    </Box>
  );

  const renderTableLoading = () => (
    <Card
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        width: "100%",
        ...sx,
      }}
    >
      <CardContent>
        <Box
          sx={{
            mb: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Skeleton variant="text" width={200} height={32} />
          <Box sx={{ display: "flex", gap: 1 }}>
            <Skeleton
              variant="rectangular"
              width={100}
              height={36}
              sx={{ borderRadius: 1 }}
            />
            <Skeleton
              variant="rectangular"
              width={36}
              height={36}
              sx={{ borderRadius: 1 }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            mb: 2,
            p: 1.5,
            bgcolor: "rgba(0,0,0,0.03)",
            borderRadius: 1,
          }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
              key={i}
              variant="text"
              width={`${i === 0 ? 8 : i === 1 ? 30 : i === 2 ? 25 : 30}%`}
              height={20}
              sx={{ mx: 1 }}
            />
          ))}
        </Box>

        {Array.from({ length: count }).map((_, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              mb: 1,
              p: 1.5,
              borderBottom: index !== count - 1 ? "1px solid" : "none",
              borderColor: "divider",
            }}
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton
                key={i}
                variant={i === 0 ? "circular" : "text"}
                width={i === 0 ? 32 : `${i === 1 ? 30 : i === 2 ? 25 : 30}%`}
                height={i === 0 ? 32 : 20}
                sx={{ mx: 1 }}
              />
            ))}
          </Box>
        ))}

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 2,
            alignItems: "center",
          }}
        >
          <Skeleton variant="text" width={100} height={20} sx={{ mr: 2 }} />
          <Skeleton
            variant="rectangular"
            width={160}
            height={32}
            sx={{ borderRadius: 1 }}
          />
        </Box>
      </CardContent>
    </Card>
  );

  const renderCardLoading = () => (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "1fr 1fr",
          md: "1fr 1fr 1fr",
        },
        gap: 3,
        width: "100%",
        ...sx,
      }}
    >
      {Array.from({ length: count }).map((_, index) => (
        <Card
          key={index}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <Skeleton variant="rectangular" height={160} />
          <CardContent>
            <Skeleton variant="text" width="70%" height={32} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="90%" height={20} />
            <Skeleton variant="text" width="90%" height={20} />
            <Skeleton variant="text" width="50%" height={20} sx={{ mb: 2 }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Skeleton variant="circular" width={36} height={36} />
              <Skeleton
                variant="rectangular"
                width={100}
                height={36}
                sx={{ borderRadius: 18 }}
              />
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );

  const renderDefaultLoading = () => (
    <Box sx={{ width: "100%", ...sx }}>
      <Skeleton
        variant="rectangular"
        height={200}
        sx={{ borderRadius: 2, mb: 2 }}
      />
      <Skeleton variant="text" height={40} width="60%" sx={{ mb: 1 }} />
      <Skeleton variant="text" height={20} sx={{ mb: 0.5 }} />
      <Skeleton variant="text" height={20} sx={{ mb: 0.5 }} />
      <Skeleton variant="text" height={20} width="80%" sx={{ mb: 2 }} />

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Skeleton
          variant="rectangular"
          width={120}
          height={40}
          sx={{ borderRadius: 2 }}
        />
        <Skeleton
          variant="rectangular"
          width={120}
          height={40}
          sx={{ borderRadius: 2 }}
        />
      </Box>
    </Box>
  );

  switch (type) {
    case LOADING_TYPES.PROFILE:
      return renderProfileLoading();
    case LOADING_TYPES.CHAT:
      return renderChatLoading();
    case LOADING_TYPES.TABLE:
      return renderTableLoading();
    case LOADING_TYPES.CARD:
      return renderCardLoading();
    case LOADING_TYPES.DEFAULT:
    default:
      return renderDefaultLoading();
  }
};

export default LoadingComponent;
