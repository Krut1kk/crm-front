import { useEffect, useState } from "react";
import { Modal } from "@/shared/ui/Modal/Modal";
import { Select } from "@/shared/ui/Select/Select";
import { Input } from "@/shared/ui/Input/Input";

import { inventoryApi } from "@/shared/api/inventory/inventoryApi";
import { transactionsApi } from "@/shared/api/transactions/transactionsApi";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { showToast } from "@/store/slices/toastSlice";

import styles from "./CreateTransactionModal.module.scss";

export const CreateTransactionModal = ({ open, onClose, onCreated, title }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  const [type, setType] = useState("SALE");
  const [selectedItemId, setSelectedItemId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(0);

  useEffect(() => {
    if (!open) return;

    setError("");
    setItems([]);
    setSelectedItemId("");

    const loadItems = async () => {
      try {
        const res = await inventoryApi.getList({ page: 1, limit: 100 });
        const list = res.data;
        setItems(list);

        if (list[0]?.id != null) {
          setSelectedItemId(String(list[0].id));
        }
      } catch (e) {
        setError(e?.response?.data?.message || "Error");
      }
    };

    loadItems();
  }, [open]);

  const onSubmit = async () => {
    setError("");

    try {
      const payload = {
        type,
        lines: [
          {
            itemId: Number(selectedItemId),
            quantity: Number(quantity),
            unitPrice: Number(unitPrice),
          },
        ],
      };

      await transactionsApi.create(payload);
      dispatch(showToast({ type: "success", messageKey: "toastTransactionCreated" }));
      onCreated?.();
      onClose();
    } catch (e) {
      setError(e?.response?.data?.message || "Error");
    }
  };

  const itemOptions = items.map((it) => ({
    value: String(it.id),
    label: it.sku ? `${it.sku} — ${it.name}` : it.name,
  }));

  return (
    <Modal open={open} title={title} onClose={onClose} onSubmit={onSubmit}>
      <div className={styles.form}>
        <div className={styles.field}>
          <p className={styles.label}>{t("type")}</p>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value)}
            options={[
              { value: "SALE", label: t("sale") },
              { value: "PURCHASE", label: t("purchase") },
            ]}
          />
        </div>

        <div className={styles.field}>
          <p className={styles.label}>{t("item")}</p>
          <Select
            value={selectedItemId}
            onChange={(e) => setSelectedItemId(e.target.value)}
            options={itemOptions}
          />
        </div>

        <div className={styles.grid}>
          <Input
            label={t("quantity")}
      
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <Input
            label={t("unitPrice")}
          
            value={unitPrice}
            onChange={(e) => setUnitPrice(e.target.value)}
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}
      </div>
    </Modal>
  );
};
