import "../globals.css"
const ResumeLayout = ({children}: {children: React.ReactNode}) => {
    return ( 
        <div className="h-[100dvh] w-[100dwh]">
            {children}
        </div>
     );
}
 
export default ResumeLayout;