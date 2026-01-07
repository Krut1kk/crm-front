import { useTranslation } from "react-i18next";

export const useProductsColumns = () => {
  const { t } = useTranslation();
  return [
    { accessorKey: "sku", header: t("sku") },
    { accessorKey: "name", header: t("name"), enableSorting: true },
    { accessorKey: "quantity", header: t("quantity"), enableSorting: true },
    { accessorKey: "costPrice", header: t("costPrice") },
    { accessorKey: "salePrice", header: t("salePrice")  },
  ];
};
