import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";

const RelatedProducts = ({ currentProduct }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ loading state

  useEffect(() => {
    if (!currentProduct) return;

    setLoading(true); // fetch start

    fetch("https://green-harvest-backend-seven.vercel.app/api/products")
      .then((res) => res.json())
      .then((data) => {
        const related = data.results
          .filter(
            (item) =>
              item.category === currentProduct.category &&
              item.id !== currentProduct.id
          )
          .slice(0, 5);

        setRelatedProducts(related);
      })
      .catch((err) => {
        console.error("Failed to load related products:", err);
      })
      .finally(() => {
        setLoading(false); // fetch end
      });
  }, [currentProduct]);

  return (
    <div className="px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">
        Related Products
      </h2>

      {loading ? (
        <div className=" flex justify-center items-center">
          <div className="w-10 h-10 border-4 border-t-green-500 border-gray-300 rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {relatedProducts.length === 0 && (
            <p className="text-center text-gray-500 text-lg mt-6">
              No product available in this category
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default RelatedProducts;
