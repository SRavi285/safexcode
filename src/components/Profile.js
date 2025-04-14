import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  Avatar,
  Chip,
  Box,
  Grow,
  Button,
  useMediaQuery,
  TextField,
  IconButton,
} from "@mui/material";
import { useUser } from "../context/UserContext";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useTheme } from "@mui/material/styles";
import { toast } from "react-toastify";

const Profile = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [profileImage, setProfileImage] = useState(null); // State for profile image
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (!user?.uid) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("uid", "==", user.uid));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const data = snapshot.docs[0].data();
          setUserData(data);
          setEditedData(data); // Initialize editedData with existing data
          setProfileImage(data.profileImage || null); // Load existing profile image
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, navigate]);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("uid", "==", user.uid));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const userDoc = snapshot.docs[0];
        // Include profile image in the update
        await updateDoc(doc(db, "users", userDoc.id), {
          ...editedData,
          profileImage,
        });
        setUserData({ ...editedData, profileImage }); // Update userData with edited data
        setIsEditMode(false);
        toast.success("Profile updated successfully!");
      } else {
        console.error("User document not found.");
        toast.error("Error: User document not found.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <Container sx={{ mt: 10, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!userData) {
    return (
      <Container sx={{ mt: 10, textAlign: "center" }}>
        <Typography variant="h6">No user data found.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: isMobile ? 4 : 10 }}>
      <Grow in timeout={500}>
        <Card
          sx={{
            borderRadius: 4,
            boxShadow: 4,
            overflow: "hidden",
            bgcolor: "#fff",
          }}
        >
          <Box
            sx={{
              px: 3,
              py: 3,
              background: "linear-gradient(to right, #ff9800, #ffb74d)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between", // Add this line
              gap: 2,
              flexDirection: isMobile ? "column" : "row",
              textAlign: isMobile ? "center" : "left",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {/* Profile Image */}
              <Box sx={{ position: "relative", display: "inline-block" }}>
                <label htmlFor="profile-image-upload">
                  <input
                    accept="image/*"
                    id="profile-image-upload"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                    disabled={!isEditMode}
                  />
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    disabled={!isEditMode}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "#fff",
                        color: "#ff9800",
                        width: 60,
                        height: 60,
                        fontSize: 28,
                        cursor: isEditMode ? "pointer" : "default",
                      }}
                      src={profileImage || null}
                    >
                      {!profileImage && userData.name?.[0]?.toUpperCase()}
                    </Avatar>
                  </IconButton>
                </label>

                {isEditMode && (
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      p: 0.3,
                    }}
                  >
                    <PhotoCamera fontSize="small" color="action" />
                  </Box>
                )}
              </Box>

              <Box>
                <Typography variant="h5" fontWeight="bold">
                  {userData.name}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Welcome to your profile!
                </Typography>
              </Box>
            </Box>
            {/* Edit and Save Buttons */}
            {isEditMode ? (
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                onClick={handleSaveClick}
              >
                Save
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="primary"
                startIcon={<EditIcon />}
                onClick={handleEditClick}
              >
                Edit Profile
              </Button>
            )}
          </Box>

          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography color="textSecondary">Email:</Typography>
                {isEditMode ? (
                  <TextField
                    name="email"
                    value={editedData.email || ""}
                    onChange={handleInputChange}
                    fullWidth
                    size="small"
                  />
                ) : (
                  <Typography fontWeight="bold">{userData.email}</Typography>
                )}
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography color="textSecondary">Phone:</Typography>
                <Typography fontWeight="bold">
                  {userData.phoneNumber}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography color="textSecondary">Payment Status:</Typography>
                {userData.isPaymentDone ? (
                  <Chip
                    icon={<CheckCircleIcon />}
                    label="Payment Done"
                    color="success"
                    variant="outlined"
                    sx={{ mt: 1 }}
                  />
                ) : (
                  <>
                    <Chip
                      icon={<CancelIcon />}
                      label="Payment Pending"
                      color="error"
                      variant="outlined"
                      sx={{ mt: 1 }}
                    />
                    <Box sx={{ mt: 2 }}>
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => navigate("/payment")}
                      >
                        Complete Payment
                      </Button>
                    </Box>
                  </>
                )}
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography color="textSecondary">Plan:</Typography>
                <Chip
                  label={userData.paymentType || "N/A"}
                  color="primary"
                  variant="filled"
                  sx={{ mt: 1 }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                  Address Details 📍
                </Typography>
                <Box sx={{ pl: 2 }}>
                  {isEditMode ? (
                    <TextField
                      name="address"
                      label="Address"
                      value={editedData.address || "N/A"}
                      onChange={handleInputChange}
                      fullWidth
                      size="small"
                      margin="normal"
                    />
                  ) : (
                    <Typography>
                      <strong>Address:</strong> {userData.address || "N/A"}
                    </Typography>
                  )}
                  {isEditMode ? (
                    <TextField
                      name="city"
                      label="City"
                      value={editedData.city || "N/A"}
                      onChange={handleInputChange}
                      fullWidth
                      size="small"
                      margin="normal"
                    />
                  ) : (
                    <Typography>
                      <strong>City:</strong> {userData.city || "N/A"}
                    </Typography>
                  )}
                  {isEditMode ? (
                    <TextField
                      name="state"
                      label="State"
                      value={editedData.state || "N/A"}
                      onChange={handleInputChange}
                      fullWidth
                      size="small"
                      margin="normal"
                    />
                  ) : (
                    <Typography>
                      <strong>State:</strong> {userData.state || "N/A"}
                    </Typography>
                  )}
                  {isEditMode ? (
                    <TextField
                      name="pinCode"
                      label="Pin Code"
                      value={editedData.pinCode || "N/A"}
                      onChange={handleInputChange}
                      fullWidth
                      size="small"
                      margin="normal"
                    />
                  ) : (
                    <Typography>
                      <strong>Pin Code:</strong> {userData.pinCode || "N/A"}
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grow>
    </Container>
  );
};

export default Profile;
