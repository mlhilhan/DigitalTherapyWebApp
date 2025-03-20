import { useEffect } from "react";
import {
  Typography,
  Box,
  Grid,
  Paper,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Hoş Geldiniz, {user?.username || "Kullanıcı"}
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Dijital Terapi Asistanı size nasıl yardımcı olabilir?
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Bugünkü Ruh Haliniz" />
            <Divider />
            <CardContent>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                Bugün kendinizi nasıl hissediyorsunuz?
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Ruh Halimi Kaydet
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Terapi Asistanı" />
            <Divider />
            <CardContent>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                Yapay zeka destekli terapistimizle hemen konuşmaya başlayın.
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Sohbete Başla
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardHeader title="İpuçları ve Öneriler" />
            <Divider />
            <CardContent>
              <Typography variant="body1" gutterBottom>
                Günlük meditasyon pratiği, stres seviyenizi azaltmanıza ve
                zihinsel netliği artırmanıza yardımcı olabilir. Günde sadece 5
                dakikanızı ayırarak başlayabilirsiniz.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
