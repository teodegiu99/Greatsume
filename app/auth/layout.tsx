// app/auth/layout.tsx
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return ( 
    <div className="h-full min-h-screen flex items-center justify-center relative bg-violet-600 dark:bg-violet-950 overflow-hidden">
      {/* Pattern decorativo ereditato dal NewTemplateBanner */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      
      {/* Opzionale: un leggero bagliore radiale per dare profondità */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.2)_100%)]"></div>

      <div className="relative z-10 w-full max-w-md px-4 py-12">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;