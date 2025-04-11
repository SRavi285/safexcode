import React from "react";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaEnvelope,
  FaYoutubeSquare,
  FaLinkedin,
  FaPhone,
} from "react-icons/fa";
import { MdQrCodeScanner } from "react-icons/md";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Link,
  Divider,
  Stack,
  IconButton,
} from "@mui/material";

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: "#111827", color: "white", mt: 10, py: 6, px: { xs: 3, md: 6 } }}>
      <Grid container spacing={4} maxWidth="lg" margin="auto">
        {/* Logo & About */}
        <Grid item xs={12} md={4}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <MdQrCodeScanner size={28} color="#3B82F6" />
            <Typography variant="h6" fontWeight="bold">safeXcode</Typography>
          </Stack>
          <Typography variant="body2" color="gray" mt={1}>
            Safe and Secure calling
          </Typography>
          <Typography variant="body2" color="gray" mt={1}>
            Carshala Services Private Limited
          </Typography>
          <Typography variant="body2" color="gray" mt={1}>
            H. no-96, 4th Floor, Pkt-4, Sec-2, Rohini, Delhi, India - 110085
          </Typography>
          <Typography variant="body2" color="gray" mt={1}>
            CIN U50404DL2022PTC395712
          </Typography>

          <Box mt={2}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <FaEnvelope color="#3B82F6" />
              <Link href="mailto:info@safexcode.com" color="gray" underline="hover">
                info@safexcode.com
              </Link>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1} mt={1}>
              <FaPhone color="#3B82F6" />
              <Link href="tel:+919158977766" color="gray" underline="hover">
                +91- 9158977766
              </Link>
            </Stack>
          </Box>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Quick Links
          </Typography>
          <Stack spacing={1}>
            <Link component={RouterLink} to="/" color="inherit" underline="hover">Home</Link>
            <Link component={RouterLink} to="/privacy-policy" color="inherit" underline="hover">Privacy Policy</Link>
            <Link component={RouterLink} to="/terms-&-conditions" color="inherit" underline="hover">Terms & Conditions</Link>
            <Link component={RouterLink} to="/about-us" color="inherit" underline="hover">About Us</Link>
            <Link component={RouterLink} to="/contact" color="inherit" underline="hover">Contact</Link>
          </Stack>
        </Grid>

        {/* Social Media */}
        <Grid item xs={12} md={4} textAlign={{ xs: "left", md: "center" }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Follow Us
          </Typography>
          <Stack direction="row" justifyContent={{ xs: "start", md: "center" }} spacing={2} mt={1}>
            <IconButton
              component="a"
              href="https://www.facebook.com/safexcode"
              target="_blank"
              sx={{ color: "#3b5998" }}
            >
              <FaFacebookSquare size={30} />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.youtube.com/@SafeXcode"
              target="_blank"
              sx={{ color: "#FF0000" }}
            >
              <FaYoutubeSquare size={30} />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.instagram.com/safexcode/#"
              target="_blank"
              sx={{ color: "#C13584" }}
            >
              <FaInstagramSquare size={30} />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.linkedin.com/company/safexcodee"
              target="_blank"
              sx={{ color: "#0A66C2" }}
            >
              <FaLinkedin size={30} />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>

      {/* Divider & Copyright */}
      <Divider sx={{ bgcolor: "#374151", mt: 6 }} />
      <Typography variant="body2" color="gray" align="center" mt={2}>
        &copy; {new Date().getFullYear()} safeXcode (Carshala Service Pvt. Ltd.) All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
