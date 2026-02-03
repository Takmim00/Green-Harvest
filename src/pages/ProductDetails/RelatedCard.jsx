import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";


const RelatedProducts = ({ currentProduct }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    fetch("/api/product.json")
      .then((res) => res.json())
      .then((data) => {
        const related = data
          .filter(
            (item) =>
              item.category === currentProduct.category &&
              item.id !== currentProduct.id
          )
          .slice(0, 5);

        setRelatedProducts(related);
      });
  }, [currentProduct]);

  return (
    <div className=" px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">
        Related Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
