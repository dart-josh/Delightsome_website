/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import MetaWrap from "../utils/MetaWrap";
import { ChevronLeft, List, ListRestart, Plus } from "lucide-react";
import { useProductStore } from "../Hooks/useProductStore";
import { useEffect, useState } from "react";
import ProductTile from "../components/ProductTile";
import { usePageHooks } from "../Hooks/useGeneralHooks";

const Dashboard = ({ path }) => {
  const { productList, categoryList: category } = useProductStore();

  const [categoryList, setCategoryList] = useState([]);

  const { setCurrentPage } = usePageHooks();

  useEffect(() => {
    setCurrentPage("Home");
    const list = category
      .filter((item) => item.cat.toLowerCase() !== "view all")
      .map((item) => item.cat);

    setCategoryList(list);
  }, [category, setCurrentPage]);

  return (
    <MetaWrap path={path}>
      <div className="xs:px-1 xs:mx-5 relative mx-4 mb-32 max-w-[1200px] justify-center pt-5 sm:px-5 md:mx-auto md:px-10">
        {/* Top bar */}
        <div className="block">
          <div className="text-md mb-6 flex justify-between">
            <div className="flex gap-3">
              <Link to="/">Home</Link>
              <span>/</span>
              <span>{"Store Dashboard"}</span>
            </div>

            <div
              onClick={() => history(-1)}
              className="flex cursor-pointer items-center gap-3 text-black"
            >
              <ChevronLeft size={18} />
              <span>Previous Page</span>
            </div>
          </div>

          {/* Page Title */}
          <div className="mb-8 text-3xl font-bold">{"Store Dashboard"}</div>
        </div>

        <OrderList />

        <div>
          {categoryList.map((category, idx) => {
            const productsToView = productList.filter(
              (p) => p.category === category,
            );
            return (
              <div key={idx}>
                <ListTile category={category} productsToView={productsToView} />
              </div>
            );
          })}
        </div>
      </div>
    </MetaWrap>
  );
};

const ListTile = ({ productsToView, category = "Products" }) => {
  return (
    <div>
      {/* Products */}
      <div className="mb-2 flex items-center justify-between rounded-md border border-gray-200 bg-gray-100 p-2 font-semibold text-gray-700">
        {category}
        <Link
          to={"/manage-product"}
          className="flex cursor-pointer items-center gap-1 border border-b-green-600 text-[16px] text-green-700"
        >
          <Plus size={20} /> Create
        </Link>
      </div>

      {/* Products */}
      {(productsToView && productsToView.length > 0 && (
        <div className={"flex gap-4 overflow-x-auto"}>
          {productsToView.map((product, idx) => {
            return (
              <div className="min-w-[150px] max-w-[200px]" key={idx}>
                <ProductTile
                  admin={true}
                  tile_type={"grid"}
                  key={product.id}
                  product={product}
                />
              </div>
            );
          })}
        </div>
      )) || (
        <div className="mb-6 mt-6 flex items-center justify-center gap-4 text-lg font-bold">
          <ListRestart /> No products to view
        </div>
      )}
    </div>
  );
};

const OrderList = () => {
  return (
    <div>
      <Link
        to={"/all-orders"}
        className="flex max-w-[150px] mb-5 items-center gap-2 rounded bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
      >
        <List size={18} /> View Orders
      </Link>
      
    </div>
  );
};

export default Dashboard;
