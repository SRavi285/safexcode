import React from "react";
import {
  Container,
  Typography,
  Box,
  Link,
  Paper,
  Divider,
} from "@mui/material";

const TermsAndConditions = () => {
  return (
    <Container sx={{ py: 8 }}>
      <Paper elevation={4} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          textAlign="center"
        >
          Terms and Conditions for SafeXcode
        </Typography>
        <Typography color="text.secondary" gutterBottom textAlign="center">
          Last updated: February 22, 2025
        </Typography>

        <Typography paragraph>
          Please read these Terms and Conditions carefully before using Our
          Service.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Interpretation and Definitions
        </Typography>

        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Interpretation
        </Typography>
        <Typography paragraph>
          Words with capitalized initials have meanings defined under the
          following conditions. The following definitions apply regardless of
          singular or plural usage.
        </Typography>

        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Definitions
        </Typography>
        <Box component="ul" pl={3}>
          <li>
            <strong>Application</strong> refers to SafeXcode, the software
            program provided by the Company.
          </li>
          <li>
            <strong>Application Store</strong> refers to Apple App Store or
            Google Play Store.
          </li>
          <li>
            <strong>Affiliate</strong> means any entity under common control.
          </li>
          <li>
            <strong>Company</strong> refers to Carshala Services Private
            Limited, Delhi, India.
          </li>
          <li>
            <strong>Country</strong> refers to India.
          </li>
          <li>
            <strong>Device</strong> means any device that can access the
            Service.
          </li>
          <li>
            <strong>Service</strong> refers to the Application, the Website, or
            both.
          </li>
          <li>
            <strong>Terms and Conditions</strong> refers to this agreement.
          </li>
          <li>
            <strong>Third-party Social Media Service</strong> means external
            services used by the platform.
          </li>
          <li>
            <strong>Website</strong> refers to{" "}
            <Link href="https://safexcode.com/" target="_blank" rel="noopener">
              https://safexcode.com/
            </Link>
            .
          </li>
          <li>
            <strong>You</strong> refers to the user accessing the Service.
          </li>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Acknowledgment
        </Typography>
        <Typography paragraph>
          These Terms govern your use of the Service and form a legal agreement
          with the Company. If you do not agree, you may not access the Service.
        </Typography>
        <Typography paragraph>
          You must be at least 18 years old to use this Service.
        </Typography>
        <Typography paragraph>
          Your use of the Service is subject to our{" "}
          <Link href="https://safexcode.com/privacy" target="_blank">
            Privacy Policy
          </Link>
          .
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          User Responsibilities
        </Typography>
        <Box component="ul" pl={3}>
          <li>Do not use the Service for unlawful purposes.</li>
          <li>Do not interfere with or disrupt the Service.</li>
          <li>Do not engage in unauthorized access or content distribution.</li>
          <li>
            Provide accurate, complete, and up-to-date information to the
            Company.
          </li>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Intellectual Property
        </Typography>
        <Typography paragraph>
          The Service and all original content are the exclusive property of the
          Company and its licensors.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Payments and Subscriptions
        </Typography>
        <Typography paragraph>
          Some parts of the Service require payment. Non-payment may result in
          termination of your access.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Links to Third-Party Websites
        </Typography>
        <Typography paragraph>
          We are not responsible for the content or practices of third-party
          websites linked via the Service. Review their terms separately.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Termination
        </Typography>
        <Typography paragraph>
          The Company may terminate your access without notice for any reason,
          including breach of these Terms.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Governing Law
        </Typography>
        <Typography paragraph>
          These Terms are governed by the laws of India. All disputes will be
          resolved in the courts of Delhi, India.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Compliance with IT Act, 2000
        </Typography>
        <Typography paragraph>
          We comply with the Information Technology Act, 2000 and related rules.
          Contact us if you find content violating applicable laws.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Changes to These Terms and Conditions
        </Typography>
        <Typography paragraph>
          We may update these Terms at any time. Continued use implies
          acceptance of the updated Terms.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Contact Us
        </Typography>
        <Typography paragraph>If you have any questions, reach out:</Typography>
        <Box pl={3}>
          <Typography>
            Email:{" "}
            <Link href="mailto:info@safexcode.com">info@safexcode.com</Link>
          </Typography>
          <Typography>
            Website:{" "}
            <Link href="https://safexcode.com/" target="_blank" rel="noopener">
              https://safexcode.com/
            </Link>
          </Typography>
          <Typography>Phone: +91-9158977766</Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default TermsAndConditions;
