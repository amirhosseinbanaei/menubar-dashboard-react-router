import {
  memo,
  Suspense,
  // lazy,
  // useContext
} from 'react';
import { Route, Routes } from 'react-router';

// import { AuthContext } from './contexts/AuthContext';

// Layout And Pages
import Login from './modules/auth/pages/login.page';
import { AuthGuard } from './modules/auth/guard/auth.guard';
import HomePage from './modules/home/pages/home.page';
import MainLayout from './common/components/layouts/main.layout';
import CategoriesPage from './modules/categories/pages/categories.page';
// import MainLayout from './layouts/MainLayout';
// import AddCategory from './pages/AddCategory';
// import EditCategory from './pages/EditCategory';
// import Items from './pages/Items';
// import AddItems from './pages/AddItems';
// import About from './pages/About';
// import Customers from './pages/Cutomers';
// import OrderedItems from './pages/OrderedItems';
// import EditItem from './pages/EditItem';
// import Receipt from './pages/Receipt';
// import ReservedTable from './pages/ReservedTable';
// const Home = lazy(() => import('./pages/Home'));
// const Categories = lazy(() => import('./pages/Categories'));
// const Item = lazy(() => import('./pages/Item'));
// const Orders = lazy(() => import('./pages/Orders'));
// const Account = lazy(() => import('./pages/Account'));
// const Favorite = lazy(() => import('./pages/Favorite'));
// const Checkout = lazy(() => import('./pages/Checkout'));

// const ProtectedRoute = ({ element }) => {
//   const { currentUser } = useContext(AuthContext);
//   return currentUser ? (
//     element
//   ) : (
//     <Navigate
//       to='/login'
//       replace
//     />
//   );
// };

const AllRoutes = memo(function AllRoutes() {
  return (
    <Suspense fallback={<h1>loading ...</h1>}>
      <Routes>
        <Route
          path='/'
          element={<MainLayout />}>
          <Route
            index
            element={<AuthGuard element={<HomePage />} />}
          />
          <Route
            path='/categories'
            element={<AuthGuard element={<CategoriesPage />} />}
          />
          {/* <Route
            path='/categories'
            element={<ProtectedRoute element={<Categories />} />}
          />
          <Route
            path='/categories/*'
            element={<ProtectedRoute element={<EditCategory />} />}
          />
          <Route
            path='/category/add'
            element={<ProtectedRoute element={<AddCategory />} />}
          />
          <Route
            path='/items'
            element={<ProtectedRoute element={<Items />} />}
          />
          <Route
            path='/items/*'
            element={<ProtectedRoute element={<EditItem />} />}
          />
          <Route
            path='/items/add'
            element={<ProtectedRoute element={<AddItems />} />}
          />
          <Route
            path='/about'
            element={<ProtectedRoute element={<About />} />}
          />
          <Route
            path='/customers'
            element={<ProtectedRoute element={<Customers />} />}
          />
          <Route
            path='/ordered-items'
            element={<ProtectedRoute element={<OrderedItems />} />}
          />
          <Route
            path='/receipt'
            element={<ProtectedRoute element={<Receipt />} />}
          />
          <Route
            path='/reserved-table'
            element={<ProtectedRoute element={<ReservedTable />} />}
          /> */}
        </Route>
        <Route
          path='/login'
          element={<Login />}
        />
      </Routes>
    </Suspense>
  );
});

export default AllRoutes;
