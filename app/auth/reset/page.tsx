import { ResetForm } from "@/components/auth/ResetForm";
import { Suspense } from "react";

const ResetPage = () => {
    return (
        <Suspense fallback={<div>Caricamento...</div>}>
            <ResetForm />
        </Suspense>
    );
};

export default ResetPage;
