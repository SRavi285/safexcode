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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useUser } from "../context/UserContext";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
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
  const { user, logout } = useUser();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };


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
          setEditedData(data);
          setProfileImage(data.profileImage || null);
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
        await updateDoc(doc(db, "users", userDoc.id), {
          ...editedData,
          profileImage,
        });
        setUserData({ ...editedData, profileImage });
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

  const confirmDeleteProfile = async () => {
    try {
      const usersSnapshot = await getDocs(
        query(collection(db, "users"), where("uid", "==", user.uid))
      );
      usersSnapshot.forEach(async (docSnap) => {
        await deleteDoc(doc(db, "users", docSnap.id));
      });

      const subSnapshot = await getDocs(
        query(collection(db, "subscription"), where("phoneNumber", "==", userData.phoneNumber))
      );
      subSnapshot.forEach(async (docSnap) => {
        await deleteDoc(doc(db, "subscription", docSnap.id));
      });

      const uuidSnapshot = await getDocs(
        query(collection(db, "uuid"), where("mobile_number", "==", `+91${userData.phoneNumber}`))
      );
      uuidSnapshot.forEach(async (docSnap) => {
        await deleteDoc(doc(db, "uuid", docSnap.id));
      });

      const auth = getAuth();
      await signOut(auth);
      logout();
      toast.success("Profile deleted successfully.");
      navigate("/login");
    } catch (error) {
      console.error("Error deleting profile:", error);
      toast.error("Failed to delete profile. Try again.");
    } finally {
      setDeleteDialogOpen(false);
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
              justifyContent: "space-between",
              gap: 2,
              flexDirection: isMobile ? "column" : "row",
              textAlign: isMobile ? "center" : "left",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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

            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
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
              <Button
                variant="outlined"
                color="error"
                onClick={handleDeleteClick}
              >
                Delete Profile
              </Button>
            </Box>
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
                  {["address", "city", "state", "pinCode"].map((field) => (
                    <div key={field}>
                      {isEditMode ? (
                        <TextField
                          name={field}
                          label={field[0].toUpperCase() + field.slice(1)}
                          value={editedData[field] || "N/A"}
                          onChange={handleInputChange}
                          fullWidth
                          size="small"
                          margin="normal"
                        />
                      ) : (
                        <Typography>
                          <strong>{field[0].toUpperCase() + field.slice(1)}:</strong>{" "}
                          {userData[field] || "N/A"}
                        </Typography>
                      )}
                    </div>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

      </Grow>
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Profile Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete your profile? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteProfile} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

    </Container>
  );
};

export default Profile;
