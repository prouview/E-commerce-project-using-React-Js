import { HashRouter,Routes, Route} from 'react-router-dom'; 
import ManageOrder from "./manageorder";
import ManageProduct from "./manageproduct";

function AdminApp() {
  return (
    <>
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<ManageOrder />} />
        <Route exact path="/manageproduct" element={<ManageProduct />} />
      </Routes>
    </HashRouter>
    </>
  );
}

export default AdminApp;
