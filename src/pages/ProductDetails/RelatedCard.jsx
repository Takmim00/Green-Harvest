import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";

const RelatedProducts = ({ currentProduct }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentProduct?.category) return;

    setLoading(true);

    const category = encodeURIComponent(
      currentProduct.category.toLowerCase()
    );

    fetch(
      `https://green-harvest-backend-seven.vercel.app/api/products/?category=${category}&page_size=5`
    )
      .then((res) => res.json())
      .then((data) => {
        const related = data.results.filter(
          (item) => item.id !== currentProduct.id
        );

        setRelatedProducts(related);
      })
      .catch((err) => {
        console.error("Failed to load related products:", err);
      })
      .finally(() => setLoading(false));
  }, [currentProduct]);

  return (
    <div className="px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">
        Related Products
      </h2>

      {loading ? (
        <div className="flex justify-center items-center">
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
              No related products found
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default RelatedProducts;