import Button from "@/components/Button";
import { Divider } from "@/components/Divider";
import { HStack } from "@/components/HStack";
import Input from "@/components/Input";
import Password from "@/components/Password";
import { Text } from "@/components/Text";
import { VStack } from "@/components/VStack";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import React, { useState } from "react";
import { Image, KeyboardAvoidingView, ScrollView } from "react-native";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const onToggleAuthMode = () => {
    setAuthMode((prev) => (prev === "login" ? "register" : "login"));
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <VStack
          flex={1}
          justifyContent="center"
          alignItems="center"
          p={40}
          gap={40}
        >
          <HStack gap={10}>
            {authMode === "login" ? (
              <Image
                source={require("./../assets/signin.png")}
                style={{ width: 200, height: 200 }}
              />
            ) : (
              <Image
                source={require("./../assets/signup.png")}
                style={{ width: 200, height: 200 }}
              />
            )}
          </HStack>
          <HStack gap={10}>
            <Text fontSize={30} bold mb={20}>
              Event Link
            </Text>
            <TabBarIcon name="ticket" size={50} />
          </HStack>

          <VStack w={"100%"} gap={30}>
            <VStack gap={5}>
              <Input
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                placeholderTextColor="darkgray"
                autoCapitalize="none"
                autoCorrect={false}
                h={48}
                p={14}
              />
            </VStack>
            <VStack>
              <Password
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                placeholderTextColor="darkgray"
                autoCapitalize="none"
                autoCorrect={false}
                h={48}
                p={14}
              />
            </VStack>
            <Button
              h={48}
              p={14}
              isLoading={false} //TODO : From Auth Provider
              onPress={() => {}} // TODO : From Auth Provider
            >
              {authMode === "login" ? "Login" : "Register"}
            </Button>
          </VStack>
          <Divider w={"90%"} />
          {authMode === "login" ? (
            <Text fontSize={16}>
              Don't have an account?{" "}
              <Text onPress={onToggleAuthMode} underline>
                Register now
              </Text>
            </Text>
          ) : (
            <Text fontSize={16}>
              Already have an account?{" "}
              <Text onPress={onToggleAuthMode} underline>
                Login
              </Text>
            </Text>
          )}
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
