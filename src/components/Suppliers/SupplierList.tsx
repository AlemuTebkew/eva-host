'use client';

import { Supplier } from '@/types/supplier';
import SupplierCard from './SupplierCard';
import GenericPagination from '../Pagination';

interface SupplierListProps {
  suppliers: Supplier[];
  metaData: {
    total: number;
    page: number;
    limit: number;
  };
  onPageChange: (page: number) => void;
}

export default function SupplierList({ suppliers, metaData, onPageChange }: SupplierListProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {suppliers.map(supplier => (
          <SupplierCard key={supplier.id} supplier={supplier} />
        ))}
      </div>
      <GenericPagination
        currentPage={metaData.page}
        totalPages={metaData.total}
        onPageChange={onPageChange}
      />
    </div>
  );
}
