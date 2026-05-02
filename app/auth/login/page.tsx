import { Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";

const LoginPage = () => {
  return ( 
    // Il fallback può essere un semplice loader o null
    <Suspense fallback={<div>Caricamento...</div>}>
      <LoginForm />
    </Suspense>
  );
}
 
export default LoginPage;