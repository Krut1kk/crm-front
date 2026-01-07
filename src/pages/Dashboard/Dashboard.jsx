import { useEffect, useState } from "react";
import styles from "./Dashboard.module.scss";

import { Tabs } from "@/shared/ui/Tabs/Tabs";
import { Button } from "@/shared/ui/Button/Button";
import { ButtonVariant } from "@/shared/ui/enums/button";
import { Input } from "@/shared/ui/Input/Input";
import { Table } from "@/shared/ui/Table/Table";

import { useProductsColumns } from "./tables/productsColumns";
import { useTransactionsColumns } from "./tables/transactionsColumns";

import { inventoryApi } from "@/shared/api/inventory/inventoryApi";
import { transactionsApi } from "@/shared/api/transactions/transactionsApi";
import { useTranslation } from "react-i18next";

import { CreateTransactionModal } from "./modals/CreateTransactionModal/CreateTransactionModal";
import { CreateInventoryModal } from "./modals/CreateInventoryModal/CreateInventoryModal";

export const Dashboard = () => {
  const { t } = useTranslation();

  const productsColumns = useProductsColumns();

  const [tab, setTab] = useState("products");
  const [createOpen, setCreateOpen] = useState(false);

  const [qInput, setQInput] = useState("");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const limit = 20;

  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [editingStatusId, setEditingStatusId] = useState(null);

  const load = async () => {
    if (tab === "products") {
      const res = await inventoryApi.getList({ page, limit, q, sortBy, order });
      setProducts(res.data);
      return;
    }

    const res = await transactionsApi.getList({ page, limit });
    setTransactions(res.data);
  };

  useEffect(() => {
    load();
  }, [tab, page, q, sortBy, order]);

  useEffect(() => {
    const id = setTimeout(() => {
      setQ(qInput);
    }, 400);

    return () => clearTimeout(id);
  }, [qInput]);

  const onTabChange = (v) => {
    setTab(v);
    setPage(1);
  };

  const onSearchChange = (e) => {
    setQInput(e.target.value);
    setPage(1);
  };

  const onSortChange = ({ sortBy, order }) => {
    setSortBy(sortBy);
    setOrder(order);
    setPage(1);
  };

  const onTransactionStatusChange = async (id, status) => {
    try {
      await transactionsApi.updateStatus(id, status);
    } catch (e) {
      window.alert(e?.response?.data?.message || "Error");
    }
    await load();
  };

  const transactionsColumns = useTransactionsColumns({
    onStatusChange: onTransactionStatusChange,
    editingStatusId,
    onStartStatusEdit: (id) => setEditingStatusId(id),
    onStopStatusEdit: () => setEditingStatusId(null),
  });

  const addText = tab === "products" ? t("addProduct") : t("addTransaction");
  const modalTitle = tab === "products" ? t("createProduct") : t("createTransaction");

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Tabs
          items={[
            { value: "products", label: t("products") },
            { value: "transactions", label: t("transactions") },
          ]}
          value={tab}
          onChange={onTabChange}
          className={styles.tabs}
        />

        {tab === "products" && (
          <Input
            value={qInput}
            className={styles.search}
            onChange={onSearchChange}
            placeholder={t("search")}
          />
        )}

        <Button variant={ButtonVariant.PRIMARY} onClick={() => setCreateOpen(true)}>
          {addText}
        </Button>
      </div>

      <Table
        data={tab === "products" ? products : transactions}
        columns={tab === "products" ? productsColumns : transactionsColumns}
        sortBy={tab === "products" ? sortBy : ""}
        order={tab === "products" ? order : ""}
        onSortChange={tab === "products" ? onSortChange : undefined}
      />

      {tab === "transactions" && (
        <CreateTransactionModal
          open={createOpen}
          onClose={() => setCreateOpen(false)}
          onCreated={load}
          title={modalTitle}
        />
      )}

      {tab === "products" && (
        <CreateInventoryModal
          open={createOpen}
          onClose={() => setCreateOpen(false)}
          onCreated={load}
          title={modalTitle}
        />
      )}
    </div>
  );
};
