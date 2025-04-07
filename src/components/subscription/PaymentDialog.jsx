import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  MenuItem,
  Box,
  Typography,
  Divider,
  Alert,
  CircularProgress,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const PaymentDialog = ({
  open,
  onClose,
  selectedPlan,
  planName,
  planPrice,
  profile,
  onConfirmPayment,
  isLoading,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [paymentMethod, setPaymentMethod] = useState("creditCard");

  // Payment methods
  const paymentMethods = [
    { value: "creditCard", label: t("creditCard") },
    { value: "paypal", label: "PayPal" },
    { value: "bankTransfer", label: t("bankTransfer") },
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" fontWeight="bold">
          {t("subscribeToThePlan", { plan: planName })}
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        {selectedPlan && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                {t("paymentDetails")}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label={t("fullName")}
                fullWidth
                defaultValue={`${profile?.firstName || ""} ${
                  profile?.lastName || ""
                }`}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                select
                label={t("paymentMethod")}
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                fullWidth
              >
                {paymentMethods.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {paymentMethod === "creditCard" && (
              <>
                <Grid item xs={12}>
                  <TextField
                    label={t("cardNumber")}
                    fullWidth
                    placeholder="**** **** **** ****"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label={t("expirationDate")}
                    fullWidth
                    placeholder="MM/YY"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField label="CVC" fullWidth placeholder="***" />
                </Grid>
              </>
            )}

            {paymentMethod === "paypal" && (
              <Grid item xs={12}>
                <Alert severity="info">
                  {t("youWillBeRedirectedToPayPal")}
                </Alert>
              </Grid>
            )}

            {paymentMethod === "bankTransfer" && (
              <Grid item xs={12}>
                <Alert severity="info">
                  {t("bankDetailsWillBeSentToYourEmail")}
                </Alert>
              </Grid>
            )}

            <Grid item xs={12}>
              <Box
                sx={{
                  backgroundColor: alpha(theme.palette.info.main, 0.1),
                  p: 2,
                  borderRadius: 1,
                }}
              >
                <Typography variant="subtitle2" gutterBottom>
                  {t("subscriptionSummary")}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2">{t("plan")}</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {planName}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2">{t("billingCycle")}</Typography>
                  <Typography variant="body2">{t("monthly")}</Typography>
                </Box>

                <Divider sx={{ my: 1 }} />

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="subtitle2">{t("total")}</Typography>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {typeof planPrice === "number"
                      ? `₺${planPrice}`
                      : planPrice}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>{t("cancel")}</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onConfirmPayment}
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={20} /> : null}
        >
          {isLoading ? t("processing") : t("confirmPayment")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentDialog;
