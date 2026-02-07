import { createContext, useContext, useState, useEffect } from "react";
import ProductModal from "../../components/ProductModal";

const ProductModalContext = createContext();
export const useProductModal = () => useContext(ProductModalContext);

export const ProductModalProvider = ({ children }) => {
  const [slug, setSlug] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const openProductModal = (slug) => {
    setSlug(slug);
    setIsOpen(true);
  };

  const closeProductModal = () => {
    setSlug(null);
    setProduct(null);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!slug || !isOpen) return;

    setLoading(true);
    fetch(`https://green-harvest-backend-seven.vercel.app/api/products/${slug}`)
      .then((res) => res.json())
      .then(setProduct)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug, isOpen]);

  return (
    <ProductModalContext.Provider value={{ openProductModal }}>
      {children}
      <ProductModal
        isOpen={isOpen}
        product={product}
        loading={loading}
        onClose={closeProductModal}
      />
    </ProductModalContext.Provider>
  );
};
