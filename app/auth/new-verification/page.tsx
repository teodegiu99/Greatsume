import { NewVerificationForm } from "@/components/auth/NewVerificationForm";
import { Suspense } from "react";

const NewVerificationPage = () => {
    return (
        <Suspense fallback={<div>Caricamento...</div>}>
            <NewVerificationForm />
        </Suspense>
    );
};

export default NewVerificationPage;
