import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import clsx from "clsx";
import styles from "./Table.module.scss";
import { useTranslation } from "react-i18next";

export const Table = ({ data, columns, sortBy, order, onSortChange }) => {
  const { t } = useTranslation();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const rows = table.getRowModel().rows;

  const canUseSort = Boolean(onSortChange && sortBy && order);

  const handleHeaderClick = (columnId, canSort) => {
    const isSortable = canUseSort && canSort;
    if (!isSortable) return;

    const nextOrder =
      sortBy === columnId ? (order === "asc" ? "desc" : "asc") : "asc";

    onSortChange({ sortBy: columnId, order: nextOrder });
  };

  const renderSortIcon = (columnId, canSort) => {
    const isSortable = canUseSort && canSort;
    if (!isSortable) return null;
    if (sortBy !== columnId) return "↕";
    return order === "asc" ? "↑" : "↓";
  };

  return (
    <div className={styles.root}>
      <div className={styles.scroll}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className={styles.tr}>
                {hg.headers.map((header) => {
                  const columnId = header.column.id;
                  const canSort = Boolean(header.column.columnDef.enableSorting);

                  return (
                    <th
                      key={header.id}
                      className={clsx(styles.th, canSort && canUseSort && styles.thSortable)}
                      onClick={() => handleHeaderClick(columnId, canSort)}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}

                      <span className={styles.sortIcon}>
                        {renderSortIcon(columnId, canSort)}
                      </span>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody className={styles.tbody}>
            {rows.length === 0 && (
              <tr className={styles.tr}>
                <td className={styles.empty} colSpan={columns.length}>
                  {t("noData")}
                </td>
              </tr>
            )}

            {rows.map((row) => (
              <tr key={row.id} className={styles.row}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className={styles.td}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
