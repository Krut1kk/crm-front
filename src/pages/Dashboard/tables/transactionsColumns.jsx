import { Badge } from "@/shared/ui/Badge/Badge";
import { BadgeVariant } from "../../../shared/ui/enums/badge";
import { useTranslation } from "react-i18next";
import { Select } from "@/shared/ui/Select/Select";

export const useTransactionsColumns = ({ onStatusChange, editingStatusId, onStartStatusEdit, onStopStatusEdit } = {}) => {
  const { t } = useTranslation();

  const statusOptions = [
    { value: "DRAFT", label: t("draft") },
    { value: "PENDING", label: t("pending") },
    { value: "SUCCESS", label: t("success") },
    { value: "CANCELED", label: t("canceled") },
  ];

  return [
    {
      accessorKey: "type",
      header: t("type"),
      cell: ({ row }) => {
        const type = row.original.type;
        const variant = type === "SALE" ? BadgeVariant.SALE : BadgeVariant.PURCHASE;
        const label = type === "SALE" ? t("sale") : type === "PURCHASE" ? t("purchase") : t("adjustment");
        return <Badge variant={variant}>{label}</Badge>;
      },
    },
    {
      header: t("itemId"),
      cell: ({ row }) => row.original.lines?.[0]?.itemId,
    },
    {
      header: t("quantity"),
      cell: ({ row }) => row.original.lines?.[0]?.quantity,
    },
    {
      header: t("price"),
      cell: ({ row }) => row.original.lines?.[0]?.unitPrice,
    },
    {
      accessorKey: "status",
      header: t("status"),
      cell: ({ row }) => {
        const status = row.original.status;
        const id = row.original.id;

        const statusMap = {
          SUCCESS: t("success"),
          DRAFT: t("draft"),
          PENDING: t("pending"),
          CANCELED: t("canceled"),
        };

        const variantMap = {
          SUCCESS: BadgeVariant.SUCCESS,
          DRAFT: BadgeVariant.DRAFT,
          PENDING: BadgeVariant.PENDING,
          CANCELED: BadgeVariant.CANCELED,
        };

        const variant = variantMap[status] || BadgeVariant.FAILED;

        if (!onStatusChange || !onStartStatusEdit) {
          return <Badge variant={variant}>{statusMap[status] || status}</Badge>;
        }

        if (editingStatusId === id) {
          return (
            <Select
              value={status}
              onChange={(e) => {
                onStatusChange(id, e.target.value);
                onStopStatusEdit?.();
              }}
              options={statusOptions}
            />
          );
        }

        return (
          <span onClick={() => onStartStatusEdit(id)}>
            <Badge variant={variant}>{statusMap[status] || status}</Badge>
          </span>
        );
      },
    },
  ];
};
