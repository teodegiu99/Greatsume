// components/auth/CardWrapper.tsx
import { Header } from "@/components/auth/Header";
import { Social } from "@/components/auth/Social";
import { BackButton } from "@/components/auth/BackButton";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial
}: CardWrapperProps) => {
  return (
    <div className="w-full bg-transparent">
      <Header label={headerLabel} />
      
      <div className="mt-4">
        {children}
      </div>
      
      {showSocial && (
        <div className="mt-6">
          <Social />
        </div>
      )}
      
      <div className="mt-6">
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </div>
    </div>
  );
};