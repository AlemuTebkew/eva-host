import React from 'react';
import { Button } from '../ui/button';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="product-card bg-white p-4 rounded-lg shadow-lg">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md"
      />
      <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
      <p className="text-sm text-gray-500">{product.category}</p>
      <p className="text-sm text-gray-500">{product.material}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="text-xl font-bold">₣ {product.price}</span>
        <span className="text-sm text-yellow-500">
          {product.rating}★
        </span>
      </div>
      {product.available ? (
        <Button className="mt-4 bg-blue-500 text-white p-2 rounded-lg w-full">
          Add to Cart
        </Button>
      ) : (
        <Button className="mt-4 bg-gray-500 text-white p-2 rounded-lg w-full" disabled>
          Out of Stock
        </Button>
      )}
    </div>
  );
};

export default ProductCard;
