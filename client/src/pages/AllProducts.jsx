import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import ReactPaginate from "react-paginate";

const AllProducts = () => {
  const { products, searchQuery } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(0);

  // --- Lọc theo search query ---
  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredProducts(
        products.filter(
          (product) =>
            product.inStock &&
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      // Nếu không tìm kiếm, chỉ lọc sản phẩm còn hàng
      setFilteredProducts(products.filter((product) => product.inStock));
    }
  }, [products, searchQuery]);

  // --- Phân trang ---
  const offset = currentPage * itemsPerPage;
  const currentItems = filteredProducts.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="mt-16 flex flex-col">
      <div className="flex flex-col items-end w-max">
        <p className="text-2xl font-medium uppercase">All products</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5 mt-6">
        {currentItems.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>

      <ReactPaginate
        previousLabel={
          <span className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200">
            &lt;
          </span>
        }
        nextLabel={
          <span className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200">
            &gt;
          </span>
        }
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={0}
        onPageChange={handlePageClick}
        containerClassName="flex justify-center mt-8 space-x-2 text-sm"
        activeClassName="font-bold text-primary"
        pageClassName="w-8 h-8 flex items-center justify-center border border-gray-300 rounded cursor-pointer hover:bg-gray-100"
        previousClassName="cursor-pointer"
        nextClassName="cursor-pointer"
        breakClassName="w-8 h-8 flex items-center justify-center cursor-default"
      />
    </div>
  );
};

export default AllProducts;
