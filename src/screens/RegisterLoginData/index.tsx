import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert, KeyboardAvoidingView, Platform } from "react-native";
import { Control, FieldError, FieldValues, useForm } from "react-hook-form";
import { RFValue } from "react-native-responsive-fontsize";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

import { Header } from "../../components/Header";
import { Input } from "../../components/Form/Input";
import { Button } from "../../components/Form/Button";

import { Container, Form } from "./styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { saveKey } from "../../storage/key/saveKey";
import { log } from "react-native-reanimated";

interface FormData {
  service_name: string;
  email: string;
  password: string;
}

const schema = Yup.object().shape({
  service_name: Yup.string().required("Nome do serviço é obrigatório!"),
  email: Yup.string()
    .email("Não é um email válido")
    .required("Email é obrigatório!"),
  password: Yup.string().required("Senha é obrigatória!"),
});

type RootStackParamList = {
  Home: undefined;
  RegisterLoginData: undefined;
};

type NavigationProps = StackNavigationProp<
  RootStackParamList,
  "RegisterLoginData"
>;

export function RegisterLoginData() {
  const { navigate } = useNavigation<NavigationProps>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const formControll = control as unknown as Control<FieldValues, any>;

  async function handleRegister(formData: FormData) {
    try {
      const newLoginData = {
        id: String(uuid.v4()),
        service_name: formData.service_name,
        email: formData.email,
        password: formData.password,
      };

      await saveKey(newLoginData);
      navigate("Home");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      enabled
    >
      <Header />
      <Container>
        <Form>
          <Input
            testID="service-name-input"
            title="Nome do serviço"
            name="service_name"
            error={
              (errors.service_name as FieldError) &&
              (errors.service_name?.message as string)
            }
            control={formControll}
            autoCapitalize="sentences"
            autoCorrect
          />
          <Input
            testID="email-input"
            title="E-mail ou usuário"
            name="email"
            error={
              (errors.email as FieldError) && (errors.email?.message as string)
            }
            control={formControll}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <Input
            testID="password-input"
            title="Senha"
            name="password"
            error={
              (errors.password as FieldError) &&
              (errors.password?.message as string)
            }
            control={formControll}
            secureTextEntry
          />

          <Button
            style={{
              marginTop: RFValue(8),
            }}
            title="Salvar"
            onPress={() => handleSubmit(handleRegister)()}
          />
        </Form>
      </Container>
    </KeyboardAvoidingView>
  );
}
