import React from "react";
import $ from "jquery";

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import("./Demo/Dashboard/Default"));

const UIBasicButton = React.lazy(() =>
  import("./Demo/UIElements/Basic/Button")
);
const UIBasicBadges = React.lazy(() =>
  import("./Demo/UIElements/Basic/Badges")
);
const UIBasicBreadcrumbPagination = React.lazy(() =>
  import("./Demo/UIElements/Basic/BreadcrumbPagination")
);

const UIBasicCollapse = React.lazy(() =>
  import("./Demo/UIElements/Basic/Collapse")
);
const UIBasicTabsPills = React.lazy(() =>
  import("./Demo/UIElements/Basic/TabsPills")
);
const UIBasicBasicTypography = React.lazy(() =>
  import("./Demo/UIElements/Basic/Typography")
);

const FormsElements = React.lazy(() => import("./Demo/Forms/FormsElements"));

const BootstrapTable = React.lazy(() => import("./Demo/Tables/BootstrapTable"));

const Nvd3Chart = React.lazy(() => import("./Demo/Charts/Nvd3Chart/index"));

const GoogleMap = React.lazy(() => import("./Demo/Maps/GoogleMap/index"));

const OtherSamplePage = React.lazy(() => import("./Demo/Other/SamplePage"));

const OtherDocs = React.lazy(() => import("./Demo/Other/Docs"));

const Home = React.lazy(() => import("./Page/Home/Home"));

const Shop = React.lazy(() => import("./Page/Shop/index.js"));

const Category = React.lazy(() => import("./Page/Category"));

const Blog = React.lazy(() => import("./Page/Blog"));
const Banner = React.lazy(() => import("./Page/Banner"));
const Learn = React.lazy(() => import("./Page/Learn"));
const ProductCategory = React.lazy(() => import("./Page/ProductCategory"));
const Vendor = React.lazy(() => import("./Page/Vendor"));
const PackageType = React.lazy(() => import("./Page/PackageType"));
const Attribute = React.lazy(() => import("./Page/Attribute"));
const ProductList = React.lazy(() => import("./Page/ProductList"));
const ProductForm = React.lazy(() => import("./Page/ProductForm"));
const Review = React.lazy(() => import("./Page/Review"));
const Coupon = React.lazy(() => import("./Page/Coupon"));
const ComboList = React.lazy(() => import("./Page/ComboList"));
const ComboForm = React.lazy(() => import("./Page/ComboForm"));
const SubscribedProducts = React.lazy(() =>
  import("./Page/SubscribedProducts")
);
const AttributeTerm = React.lazy(() => import("./Page/AttributeTerm"));
const Wishlist = React.lazy(() => import("./Page/Wishlist"));
const Statistics = React.lazy(() => import("./Page/Statistics"));
const AmbassadorManagement = React.lazy(() =>
  import("./Page/AmbassadorManagement")
);
const AmbassadorView = React.lazy(() =>
  import("./Page/AmbassadorManagement/view")
);
const Referral = React.lazy(() => import("./Page/Referral"));
const Orders = React.lazy(() => import("./Page/Orders"));
const Creatives = React.lazy(() => import("./Page/Creatives"));
const OrderView = React.lazy(() => import("./Page/Orders/view"));
const Users = React.lazy(() => import("./Page/Users"));
const FooterMenu = React.lazy(() => import("./Page/FooterMenu"));

const routes = [
  {
    path: "/dashboard/default",
    exact: true,
    name: "Default",
    component: DashboardDefault,
  },
  {
    path: "/basic/button",
    exact: true,
    name: "Basic Button",
    component: UIBasicButton,
  },
  {
    path: "/basic/badges",
    exact: true,
    name: "Basic Badges",
    component: UIBasicBadges,
  },
  {
    path: "/basic/breadcrumb-paging",
    exact: true,
    name: "Basic Breadcrumb Pagination",
    component: UIBasicBreadcrumbPagination,
  },
  {
    path: "/basic/collapse",
    exact: true,
    name: "Basic Collapse",
    component: UIBasicCollapse,
  },
  {
    path: "/basic/tabs-pills",
    exact: true,
    name: "Basic Tabs & Pills",
    component: UIBasicTabsPills,
  },
  {
    path: "/basic/typography",
    exact: true,
    name: "Basic Typography",
    component: UIBasicBasicTypography,
  },
  {
    path: "/forms/form-basic",
    exact: true,
    name: "Forms Elements",
    component: FormsElements,
  },
  {
    path: "/tables/bootstrap",
    exact: true,
    name: "Bootstrap Table",
    component: BootstrapTable,
  },
  {
    path: "/charts/nvd3",
    exact: true,
    name: "Nvd3 Chart",
    component: Nvd3Chart,
  },
  {
    path: "/maps/google-map",
    exact: true,
    name: "Google Map",
    component: GoogleMap,
  },
  {
    path: "/sample-page",
    exact: true,
    name: "Sample Page",
    component: OtherSamplePage,
  },
  {
    path: "/Home",
    exact: true,
    name: "Home",
    component: Home,
  },
  {
    path: "/Shop",
    exact: true,
    name: "Shop",
    component: Shop,
  },
  {
    path: "/Category",
    exact: true,
    name: "Category",
    component: Category,
  },
  {
    path: "/Blog",
    exact: true,
    name: "Blog",
    component: Blog,
  },
  {
    path: "/Banner",
    exact: true,
    name: "Banner",
    component: Banner,
  },
  {
    path: "/Learn",
    exact: true,
    name: "Learn",
    component: Learn,
  },
  {
    path: "/ProductCategory",
    exact: true,
    name: "ProductCategory",
    component: ProductCategory,
  },
  {
    path: "/Vendor",
    exact: true,
    name: "Vendor",
    component: Vendor,
  },
  {
    path: "/PackageType",
    exact: true,
    name: "PackageType",
    component: PackageType,
  },
  {
    path: "/Attribute",
    exact: true,
    name: "Attribute",
    component: Attribute,
  },
  {
    path: "/Attribute",
    exact: true,
    name: "Attribute",
    component: Attribute,
  },
  {
    path: "/ProductList",
    exact: true,
    name: "ProductList",
    component: ProductList,
  },
  {
    path: "/Review",
    exact: true,
    name: "Review",
    component: Review,
  },
  {
    path: "/Coupon",
    exact: true,
    name: "Coupon",
    component: Coupon,
  },
  {
    path: "/ProductForm/:type",
    exact: true,
    name: "ProductForm",
    component: ProductForm,
  },
  {
    path: "/ProductForm/:type/:id",
    exact: true,
    name: "ProductFormEdit",
    component: ProductForm,
  },
  {
    path: "/ComboList",
    exact: true,
    name: "ComboList",
    component: ComboList,
  },
  {
    path: "/ComboForm/:type",
    exact: true,
    name: "ComboForm",
    component: ComboForm,
  },
  {
    path: "/ComboForm/:type/:id",
    exact: true,
    name: "ComboFormEdit",
    component: ComboForm,
  },
  {
    path: "/SubscribedProducts",
    exact: true,
    name: "Subscribed Products",
    component: SubscribedProducts,
  },
  {
    path: "/Attribute/AttributeTerm/:id",
    exact: true,
    name: "Attribute Term",
    component: AttributeTerm,
  },
  {
    path: "/Wishlist",
    exact: true,
    name: "Wishlist",
    component: Wishlist,
  },
  {
    path: "/Statistics",
    exact: true,
    name: "Statistics",
    component: Statistics,
  },
  {
    path: "/AmbassadorManagement",
    exact: true,
    name: "AmbassadorManagement",
    component: AmbassadorManagement,
  },
  {
    path: "/:type/view/:id",
    exact: true,
    name: "AmbassadorManagement",
    component: AmbassadorView,
  },
  {
    path: "/Referrals",
    exact: true,
    name: "Referral",
    component: Referral,
  },
  {
    path: "/Orders",
    exact: true,
    name: "Orders",
    component: Orders,
  },
  {
    path: "/Order/:id",
    exact: true,
    name: "Orders View",
    component: OrderView,
  },
  {
    path: "/Creatives",
    exact: true,
    name: "Creatives",
    component: Creatives,
  },
  {
    path: "/Users",
    exact: true,
    name: "Users",
    component: Users,
  },
  {
    path: "/FooterMenu",
    exact: true,
    name: "FooterMenu",
    component: FooterMenu,
  },

  { path: "/docs", exact: true, name: "Documentation", component: OtherDocs },
];

export default routes;
