import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import {
  BottomSheet,
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
const BSMReminder = ({ onPressed }) => {
  const [flag, setflag] = useState(false);

  const [pressed, setPressed] = useState(onPressed);

  useEffect(() => {
    if (flag) return;
    if (onPressed) bottomSheetModalRef.current?.present();
    else bottomSheetModalRef.current?.dismiss();
  });

  // ref;
  const bottomSheetModalRef = useRef();
  // state
  const [isSheetClosed, setIsSheetClosed] = useState(true);
  // variables
  const snapPoints = useMemo(() => ["50%", "50%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    setIsSheetClosed(false);
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetClose = () => {
    console.log("da bam");
    bottomSheetModalRef.current?.dismiss(); // Đóng BottomSheet khi người dùng bấm bên ngoài
  };
  const handleSheetChanges = useCallback((index) => {
    if (index === -1) {
      bottomSheetModalRef.current?.dismiss();
      console.log("da dong");
    } else {
      console.log("da mo");
      bottomSheetModalRef.current?.present();
    }
  }, []);
  return (
    <View style={styles.container}>
      <BottomSheetModalProvider>
        <View style={styles.containerBottomSheet}>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            enableDismissOnClose={true}
            onChange={handleSheetChanges}
            // onClose={handleSheetClose}
          ></BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </View>
  );
};

export default BSMReminder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerBottomSheet: {},
});
