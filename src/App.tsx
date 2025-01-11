import MainLayout from "./Components/layout/MainLayout";
import ProtectedRoutes from "./Components/layout/ProtectedRoutes";


const App = () => {
  return (
    <div>
      {/* protect router */}
     <ProtectedRoutes>
        <MainLayout></MainLayout>
      </ProtectedRoutes> 
    </div>
  );
};

export default App;