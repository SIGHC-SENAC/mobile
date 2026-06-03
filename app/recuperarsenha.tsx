// Imprtando ícones e hooks necessários
import { router } from "expo-router";
import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import IconInput from "../components/IconInput";
import PrimaryButton from "../components/PrimaryButton";
import TextLink from "../components/TextLink";

export default function RecuperarSenhaScreen() {
  const [email, setEmail] = useState("");

  return (
    <AuthLayout
      title="Recuperar Senha"
      subtitle="Informe seu e-mail para receber o link de redefinição de senha."
      showBackButton={true}
    >
      <IconInput
        iconName="email"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <PrimaryButton title="Enviar link de redefinição" onPress={() => {}} />

      <TextLink
        text="Voltar para o Login"
        onPress={() => router.back()}
        showArrow={true}
        color="#003D82"
      />
    </AuthLayout>
  );
}
