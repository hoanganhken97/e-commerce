import React from "react";
import { View, StyleSheet } from "react-native";
import CustomText from "../../../components/UI/CustomText";
import UploadButton from "./UploadButton";
import Detail from "./Detail";
const ProfileBody = ({
  user,
  uploadButton,
  setUploadButton,
  setImageUri,
  loading,
  UploadProfile,
}) => {
  return (
    <View style={styles.footer}>
      <View style={styles.titleContainer}>
        <CustomText style={styles.title}>Thông tin cá nhân</CustomText>
      </View>
      <Detail icon="person" content={user.name} />
      <Detail icon="email-outline" content={user.email} />
      <Detail
        icon="phone"
        content={user.phone.length === 0 ? "Not added yet" : user.phone}
      />
      <Detail
        icon="location-on"
        content={user.address.length === 0 ? "Not added yet" : user.address}
      />
      <UploadButton
        uploadButton={uploadButton}
        setUploadButton={setUploadButton}
        setImageUri={setImageUri}
        loading={loading}
        UploadProfile={UploadProfile}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    width: "100%",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  titleContainer: {
    height: 30,
  },

  title: {
    fontWeight: "600",
    textTransform: "uppercase",
  },
});

export default ProfileBody;
