import { useState } from "react";
import { Modal } from "@/shared/ui/Modal/Modal";
import { Input } from "@/shared/ui/Input/Input";
import { inventoryApi } from "@/shared/api/inventory/inventoryApi";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { showToast } from "@/store/slices/toastSlice";

import styles from "./CreateInventoryModal.module.scss";

export const CreateInventoryModal = ({ open, onClose, onCreated, title }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    sku: "",
    name: "",
    quantity: 0,
    costPrice: 0,
    salePrice: 0,
  });
  const { t } = useTranslation();

  const [error, setError] = useState("");

  const setField = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const onSubmit = async () => {
    setError("");

    try {
      const payload = {
        sku: form.sku,
        name: form.name,
        quantity: Number(form.quantity),
        costPrice: Number(form.costPrice),
        salePrice: Number(form.salePrice),
      };

      await inventoryApi.create(payload);
      dispatch(showToast({ type: "success", messageKey: "toastProductCreated" }));
      onCreated?.();
      onClose();
    } catch (e) {
      setError(e?.response?.data?.message || "Error");
    }
  };

  return (
    <Modal open={open} title={title} onClose={onClose} onSubmit={onSubmit}>
      <div className={styles.form}>
        <div className={styles.gridTop}>
          <Input label={t("sku")} value={form.sku} onChange={setField("sku")} />
          <Input label={t("name")} value={form.name} onChange={setField("name")} />
        </div>

        <div className={styles.grid}>
          <Input
            label={t("quantity")}
            
            value={form.quantity}
            onChange={setField("quantity")}
          />

          <Input
            label={t("costPrice")}
           
            value={form.costPrice}
            onChange={setField("costPrice")}
          />

          <Input
            label={t("salePrice")}
          
            value={form.salePrice}
            onChange={setField("salePrice")}
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}
      </div>
    </Modal>
  );
};
