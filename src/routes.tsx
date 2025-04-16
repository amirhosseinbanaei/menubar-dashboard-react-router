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
import AddCategoryPage from './modules/categories/pages/add-category.page';
import EditCategoryPage from './modules/categories/pages/edit-category.page';
import ItemsPage from './modules/items/pages/items.page';
import AddItemPage from './modules/items/pages/add-item.page';
import EditItemPage from './modules/items/pages/edit-item.page';
import ExtraItemsPage from './modules/extra-items/pages/extra-items.page';
import EditExtraItemPage from './modules/extra-items/pages/edit-extra-item.page';
import AddExtraItemPage from './modules/extra-items/pages/add-extra-item.page';
import TagsPage from './modules/tags/pages/tags.page';
import AddTagPage from './modules/tags/pages/add-tag.page';
import EditTagPage from './modules/tags/pages/edit-tag.page';
import AboutPage from './modules/about/pages/about.page';
import CustomersPage from './modules/customers/pages/customers.page';
import OrdersPage from './modules/orders/pages/orders.page';
import CustomizationPage from './modules/customization/page/customization.page';
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
          <Route
            path='/categories/add'
            element={<AuthGuard element={<AddCategoryPage />} />}
          />
          <Route
            path='/categories/*'
            element={<AuthGuard element={<EditCategoryPage />} />}
          />
          <Route
            path='/items'
            element={<AuthGuard element={<ItemsPage />} />}
          />
          <Route
            path='/items/add'
            element={<AuthGuard element={<AddItemPage />} />}
          />
          <Route
            path='/items/*'
            element={<AuthGuard element={<EditItemPage />} />}
          />
          <Route
            path='/extra-items'
            element={<AuthGuard element={<ExtraItemsPage />} />}
          />
          <Route
            path='/extra-items/add'
            element={<AuthGuard element={<AddExtraItemPage />} />}
          />
          <Route
            path='/extra-items/*'
            element={<AuthGuard element={<EditExtraItemPage />} />}
          />
          <Route
            path='/extra-items'
            element={<AuthGuard element={<ExtraItemsPage />} />}
          />
          <Route
            path='/extra-items/add'
            element={<AuthGuard element={<AddExtraItemPage />} />}
          />
          <Route
            path='/extra-items/*'
            element={<AuthGuard element={<EditExtraItemPage />} />}
          />
          <Route
            path='/tags'
            element={<AuthGuard element={<TagsPage />} />}
          />
          <Route
            path='/tags/add'
            element={<AuthGuard element={<AddTagPage />} />}
          />
          <Route
            path='/tags/*'
            element={<AuthGuard element={<EditTagPage />} />}
          />
          <Route
            path='/about'
            element={<AuthGuard element={<AboutPage />} />}
          />
          <Route
            path='/customers'
            element={<AuthGuard element={<CustomersPage />} />}
          />
          <Route
            path='/orders'
            element={<AuthGuard element={<OrdersPage />} />}
          />
          <Route
            path='/customization'
            element={<AuthGuard element={<CustomizationPage />} />}
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
