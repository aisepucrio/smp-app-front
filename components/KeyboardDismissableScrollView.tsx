import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  ViewStyle,
} from "react-native";

interface Props {
  children: React.ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export default function KeyboardDismissableScrollView({
  children,
  contentContainerStyle,
}: Props) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            styles.contentContainer,
            contentContainerStyle,
          ]}
        >
          {children}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },
});
