import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions, Alert } from "react-native";
//Redux
import { useDispatch, useSelector } from "react-redux";
//Action
import * as AuthActions from "../../store/auth/authActions";
import EditButtom from "./components/EditButton";
import ProfilePic from "./components/ProfilePic";
import ProfileBody from "./components/ProfileBody";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

const { width, height } = Dimensions.get("window");

const ProfileScreen = (props) => {
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const [imageUri, setImageUri] = useState("");
  const [filename, setFilename] = useState("");
  const [type, setType] = useState("");
  const [uploadButton, setUploadButton] = useState(true);

  const dispatch = useDispatch();
  const unmounted = useRef(false);
  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);
  const UploadProfile = async () => {
    setLoading(true);
    try {
      await dispatch(AuthActions.UploadProfilePic(imageUri, filename, type));
      setLoading(false);
      setUploadButton(true);
      if (!unmounted.current) {
        Alert.alert("Cập nhật", "Cập nhật thành công", [
          {
            text: "Ok",
          },
        ]);
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <ActionSheetProvider>
      <View style={styles.container}>
        <View style={styles.header}></View>
        <View style={styles.profileContainer}>
          <View style={styles.profileBox}>
            <EditButtom navigation={props.navigation} user={user} />
            <ProfilePic
              user={user}
              imageUri={imageUri}
              setImageUri={setImageUri}
              setType={setType}
              setFilename={setFilename}
              setUploadButton={setUploadButton}
            />
            <ProfileBody
              user={user}
              uploadButton={uploadButton}
              setUploadButton={setUploadButton}
              setImageUri={setImageUri}
              loading={loading}
              UploadProfile={UploadProfile}
            />
          </View>
        </View>
      </View>
    </ActionSheetProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width,
    flexDirection: "row",
    height: 0.15 * height,
    justifyContent: "center",
  },
  profileContainer: {
    width,
    justifyContent: "center",
    alignItems: "center",
  },
  profileBox: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width,
    alignItems: "center",
  },
});

export default ProfileScreen;
