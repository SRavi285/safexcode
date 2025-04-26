const functions = require("firebase-functions");
const admin = require("firebase-admin");
const crypto = require("crypto");
admin.initializeApp();

const merchantKey = "oTq3Pd";
const salt = "rjiU3f5AV0VzUG4FSkQRmQwBb2n4XXbi";

exports.payuSuccessRedirect = functions.https.onRequest(async (req, res) => {
  try {
    console.log("✅ PayU Success POST:", req.body);

    const {
      mihpayid,
      txnid,
      amount,
      email,
      phone,
      productinfo,
      firstname,
      status,
      hash: posted_hash,
      udf1 = "", // User Defined Field #1
      udf2 = "", // User Defined Field #2
      udf3 = "", // User Defined Field #3
      udf4 = "", // User Defined Field #4
      udf5 = "", // User Defined Field #5
      additionalCharges = "",
    } = req.body;

    console.log("Request Body:", req.body);

    let hashSequence;
    if (additionalCharges) {
      // If additionalCharges exists, it should be prepended to the hash sequence
      hashSequence = `${additionalCharges}|${salt}|${status}||||||${udf5}|${udf4}|${udf3}|${udf2}|${udf1}|${email}|${firstname}|${productinfo}|${amount}|${txnid}|${merchantKey}`;
    } else {
      // Regular hash sequence without additionalCharges
      hashSequence = `${salt}|${status}||||||${udf5}|${udf4}|${udf3}|${udf2}|${udf1}|${email}|${firstname}|${productinfo}|${amount}|${txnid}|${merchantKey}`;
    }

    // ✅ Verify hash (prevent tampering)
    console.log("Hash sequence:", hashSequence);

    const calculatedHash = crypto
      .createHash("sha512")
      .update(hashSequence)
      .digest("hex")
      .toLowerCase();

    console.log("Posted Hash:", posted_hash);
    console.log("Calculated Hash:", calculatedHash);

    // Compare with posted_hash
    if (calculatedHash !== posted_hash.toLowerCase()) {
      console.error("❌ Hash mismatch. Payment may be tampered.");
      return res.status(400).send("Invalid payment hash");
    }

    // 🔍 Find user by email
    const usersRef = admin.firestore().collection("users");
    const userSnapshot = await usersRef
      .where("email", "==", email)
      .limit(1)
      .get();

    if (userSnapshot.empty) {
      console.error("⚠️ No user found with email:", email);
      return res.status(404).send("User not found");
    }

    const userDoc = userSnapshot.docs[0];
    const userId = userDoc.id;

    // 📅 Determine subscription type
    const planDuration = productinfo.includes("6 Months") ? "6months" : "1year";
    const durationMonths = planDuration === "6months" ? 6 : 12;

    // Create proper Date objects
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + durationMonths);

    // 🧾 Prepare subscription data
    const subscriptionData = {
      amount: Number(amount),
      codeId: planDuration,
      planId: planDuration,
      currency: "INR",
      email: email || "",
      phoneNumber: phone || "",
      startDate: admin.firestore.Timestamp.fromDate(startDate),
      endDate: admin.firestore.Timestamp.fromDate(endDate),
      remainingCalls: 100,
      remainingMinutes: 100,
      status: "active",
      timestamp: admin.firestore.Timestamp.fromDate(startDate),
      transactionId: mihpayid,
      userId: userId,
    };

    // 💾 Save subscription
    await admin.firestore().collection("subscription").add(subscriptionData);

    // ✅ Mark user as paid
    await usersRef.doc(userId).update({
      isPaymentDone: true,
      paymentType: planDuration,
    });

    // 🔄 Update subscriptionStatus in uuid collection
    const uuidRef = admin.firestore().collection("uuid");
    const uuidSnapshot = await uuidRef
      .where("userId", "==", userId)
      .limit(1)
      .get();

    if (!uuidSnapshot.empty) {
      const uuidDoc = uuidSnapshot.docs[0];
      await uuidRef.doc(uuidDoc.id).update({
        subscriptionStatus: planDuration,
      });
      console.log("📦 uuid.subscriptionStatus updated to:", planDuration);
    } else {
      console.warn("⚠️ No uuid document found for user:", userId);
    }

    console.log(
      "🎉 Subscription saved and user + uuid updated:",
      subscriptionData
    );
    res.redirect(302, "https://www.safexcode.com/success");

    // add some changes to user document and subscription document
    const db = admin.firestore();

    // Update user table
    await db.collection("users").doc(userId).update({
      userType: planDuration,
    });
  } catch (error) {
    console.error("🔥 Error handling payment success:", error);
    res.status(500).send("Something went wrong");
  }
});

exports.payuFailureRedirect = functions.https.onRequest((req, res) => {
  console.log("❌ PayU Failure:", req.body);
  res.redirect(302, "https://www.safexcode.com/failure");
});
