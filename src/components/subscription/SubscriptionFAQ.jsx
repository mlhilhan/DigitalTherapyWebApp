import React from "react";
import {
  Box,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
} from "@mui/material";
import { ExpandMore, QuestionAnswer } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const SubscriptionFAQ = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  // Define FAQ items
  const faqItems = [
    {
      question: t("canIChangeMyPlanLater"),
      answer: t("yesYouCanUpgradeOrDowngradeYourPlanAtAnyTime"),
    },
    {
      question: t("whatPaymentMethodsDoYouAccept"),
      answer: t("weAcceptAllMajorCreditCardsPayPalAndBankTransfers"),
    },
    {
      question: t("isThereARefundPolicy"),
      answer: t("yesWeOffer14DayMoneyBackGuarantee"),
    },
    {
      question: t("canIUseTheAppOnMultipleDevices"),
      answer: t("yesYourSubscriptionWorksAcrossAllYourDevices"),
    },
    {
      question: t("areMyDataAndConversationsPrivate"),
      answer: t("yesAllYourDataAndConversationsAreEncryptedAndPrivate"),
    },
    {
      question: t("whatHappensWhenMembershipExpires"),
      answer: t(
        "youWillLoseAccessToPremiumFeaturesButCanStillAccessBasicFunctions"
      ),
    },
  ];

  return (
    <Box sx={{ mb: 6 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <QuestionAnswer sx={{ color: "primary.main", mr: 1, fontSize: 28 }} />
        <Typography variant="h5" fontWeight="bold">
          {t("frequentlyAskedQuestions")}
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {faqItems.map((item, index) => (
          <Grid item xs={12} key={index}>
            <Accordion
              disableGutters
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: "8px !important",
                mb: 1,
                "&:before": {
                  display: "none",
                },
                "&.Mui-expanded": {
                  margin: 0,
                  mt: 0,
                  mb: 1,
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                sx={{
                  borderRadius: 2,
                  "&.Mui-expanded": {
                    minHeight: 48,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  },
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ pt: 0 }}>
                <Typography variant="body2" color="text.secondary">
                  {item.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SubscriptionFAQ;
