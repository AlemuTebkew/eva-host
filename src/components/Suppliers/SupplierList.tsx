'use client';

import { Supplier } from '@/types/supplier';
import SupplierCard from './SupplierCard';

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
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
        {suppliers.map(supplier => (
          <SupplierCard key={supplier.id} supplier={supplier} />
        ))}
      </div>
      {/* <Pagination
        total={metaData.total}
        currentPage={metaData.page}
        limit={metaData.limit}
        onPageChange={onPageChange}
      /> */}
    </div>
  );
}
