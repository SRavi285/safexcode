import React from "react";
import { Container, Typography, Box, Link } from "@mui/material";

const TermsAndConditions = () => {
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Terms and Conditions for SafeXcode
      </Typography>
      <Typography color="text.secondary" gutterBottom>
        Last updated: February 22, 2025
      </Typography>

      <Typography variant="body1" paragraph>
        Please read these Terms and Conditions carefully before using Our
        Service.
      </Typography>

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
          <strong>Application</strong> refers to SafeXcode, the software program
          provided by the Company, available for download on any electronic
          device.
        </li>
        <li>
          <strong>Application Store</strong> refers to digital distribution
          services operated by Apple Inc. (Apple App Store) or Google Inc.
          (Google Play Store).
        </li>
        <li>
          <strong>Affiliate</strong> means an entity that controls, is
          controlled by, or is under common control with a party.
        </li>
        <li>
          <strong>Company</strong> refers to Carshala Services Private Limited,
          Delhi, India.
        </li>
        <li>
          <strong>Country</strong> refers to India.
        </li>
        <li>
          <strong>Device</strong> means any device that can access the Service.
        </li>
        <li>
          <strong>Service</strong> refers to the Application, the Website, or
          both.
        </li>
        <li>
          <strong>Terms and Conditions</strong> refers to this agreement
          governing the use of the Service.
        </li>
        <li>
          <strong>Third-party Social Media Service</strong> means any
          third-party services made available by the Service.
        </li>
        <li>
          <strong>Website</strong> refers to SafeXcode, accessible from{" "}
          <Link href="https://safexcode.com/" target="_blank" rel="noopener">
            https://safexcode.com/
          </Link>
          .
        </li>
        <li>
          <strong>You</strong> refers to the individual or entity accessing or
          using the Service.
        </li>
      </Box>

      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Acknowledgment
      </Typography>
      <Typography paragraph>
        These Terms govern the use of the Service and form a legally binding
        agreement between You and the Company.
      </Typography>
      <Typography paragraph>
        By accessing or using the Service, You agree to be bound by these Terms.
        If You disagree with any part of these Terms, You may not access the
        Service.
      </Typography>
      <Typography paragraph>
        You represent that You are at least 18 years old. The Company does not
        permit users under 18 to access the Service.
      </Typography>
      <Typography paragraph>
        Your use of the Service is also subject to Our Privacy Policy. Please
        review it before use.
      </Typography>

      <Typography variant="h5" fontWeight="bold" gutterBottom>
        User Responsibilities
      </Typography>
      <Box component="ul" pl={3}>
        <li>
          Not to use the Service for unlawful purposes under applicable laws.
        </li>
        <li>Not to interfere with or disrupt the Service.</li>
        <li>
          Not to engage in unauthorized access or distribution of proprietary
          content.
        </li>
        <li>To provide accurate and up-to-date information to the Company.</li>
      </Box>

      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Intellectual Property
      </Typography>
      <Typography paragraph>
        The Service and its original content are the exclusive property of the
        Company and its licensors.
      </Typography>

      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Payments and Subscriptions
      </Typography>
      <Typography paragraph>
        Some parts of the Service may require payment. You agree to the terms
        specified at the time of purchase. Non-payment may lead to suspension or
        termination.
      </Typography>

      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Links to Third-Party Websites
      </Typography>
      <Typography paragraph>
        We are not responsible for third-party websites or their policies.
        Please review their terms before using them.
      </Typography>

      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Termination
      </Typography>
      <Typography paragraph>
        We may suspend or terminate Your access for any reason without notice.
        Your right to use the Service ceases immediately upon termination.
      </Typography>

      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Governing Law
      </Typography>
      <Typography paragraph>
        These Terms are governed by the laws of India. Disputes shall be subject
        to courts in Delhi, India.
      </Typography>

      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Compliance with IT Act, 2000
      </Typography>
      <Typography paragraph>
        We comply with the Information Technology Act, 2000 and relevant data
        protection rules. You may notify Us of any legal concerns via the
        contact methods below.
      </Typography>

      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Changes to These Terms and Conditions
      </Typography>
      <Typography paragraph>
        We may update these Terms. Continued use after changes implies
        acceptance. We will provide notice if changes are material.
      </Typography>

      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Contact Us
      </Typography>
      <Typography paragraph>If You have any questions:</Typography>
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
    </Container>
  );
};

export default TermsAndConditions;
