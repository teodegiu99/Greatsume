import { RegisterForm } from "@/components/auth/RegisterForm";
import { Suspense } from "react";

const RegisterPage = () => {
    return (
        <Suspense fallback={<div>Caricamento...</div>}>
            <div className="z-10">
                <RegisterForm />
            </div>
        </Suspense>
    );
};

export default RegisterPage;
