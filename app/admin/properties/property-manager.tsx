"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Icon } from "../../components/icons";
import type { AdminProperty, AdminStatus } from "../data";
import { getInitialAdminProperties, loadAdminProperties, saveAdminProperties } from "../data";

const filters: Array<"All" | AdminStatus> = ["All", "Available", "Sold", "Rented", "Leased"];
const pageSize = 6;

/** Filters, paginates, and updates the local prototype property inventory. */
export function AdminPropertyManager() {
  const [records, setRecords] = useState<AdminProperty[]>(getInitialAdminProperties);
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => setRecords(loadAdminProperties()), []);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return records.filter(
      (record) =>
        (filter === "All" || record.adminStatus === filter) &&
        (!normalized || `${record.title} ${record.location}`.toLowerCase().includes(normalized)),
    );
  }, [filter, query, records]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visibleRecords = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Saves changed property records to the browser's local prototype store.
  function updateRecords(next: AdminProperty[]) {
    setRecords(next);
    saveAdminProperties(next);
  }

  // Changes a listing between available and sold from its row action.
  function toggleSold(record: AdminProperty) {
    updateRecords(
      records.map((item) =>
        item.id === record.id
          ? { ...item, adminStatus: item.adminStatus === "Available" ? "Sold" : "Available" }
          : item,
      ),
    );
  }

  // Removes one listing from the current browser's admin inventory.
  function deleteRecord(record: AdminProperty) {
    if (!window.confirm(`Delete “${record.title}” from this browser's admin list?`)) return;
    updateRecords(records.filter((item) => item.id !== record.id));
  }

  // Counts each status from the complete record set for the status tabs.
  function getFilterCount(status: (typeof filters)[number]) {
    return status === "All"
      ? records.length
      : records.filter((record) => record.adminStatus === status).length;
  }

  return (
    <section className="admin-panel" aria-labelledby="admin-list-title">
      <div className="admin-panel-heading">
        <h2 id="admin-list-title">
          <Icon name="building" />
          Added Properties <span>({records.length})</span>
        </h2>
        <Link className="admin-button admin-button--primary" href="/admin/properties/new">
          <Icon name="plus" />
          Add Property
        </Link>
      </div>
      <div className="admin-toolbar">
        <div className="admin-status-tabs" role="group" aria-label="Filter by listing status">
          {filters.map((status) => (
            <button
              key={status}
              type="button"
              className={filter === status ? "is-active" : ""}
              aria-pressed={filter === status}
              onClick={() => {
                setFilter(status);
                setPage(1);
              }}
            >
              {status} <span>({getFilterCount(status)})</span>
            </button>
          ))}
        </div>
        <label className="admin-search">
          <Icon name="search" />
          <span className="visually-hidden">Search by title or location</span>
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            placeholder="Search by title or location..."
          />
        </label>
      </div>
      <div className="admin-table-scroll">
        <table className="admin-table">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Property Title</th>
              <th scope="col">Type</th>
              <th scope="col">Price</th>
              <th scope="col">Location</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleRecords.map((record) => (
              <AdminPropertyRow
                key={record.id}
                record={record}
                onToggleStatus={toggleSold}
                onDelete={deleteRecord}
              />
            ))}
            {!visibleRecords.length && (
              <tr>
                <td className="admin-empty" colSpan={7}>
                  <strong>No properties found</strong>
                  <span>Try another search or status filter.</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="admin-pagination">
        <span>
          Showing {filtered.length ? (page - 1) * pageSize + 1 : 0}–
          {Math.min(page * pageSize, filtered.length)} of {filtered.length} properties
        </span>
        <div>
          <button type="button" disabled={page <= 1} onClick={() => setPage(page - 1)}>
            <Icon name="chevron" />
            Previous
          </button>
          <span className="admin-page-number">{page}</span>
          <button type="button" disabled={page >= pageCount} onClick={() => setPage(page + 1)}>
            Next
            <Icon name="chevron" />
          </button>
        </div>
      </div>
    </section>
  );
}

/** Renders one inventory row with category, status, and available actions. */
function AdminPropertyRow({
  record,
  onToggleStatus,
  onDelete,
}: {
  record: AdminProperty;
  onToggleStatus: (record: AdminProperty) => void;
  onDelete: (record: AdminProperty) => void;
}) {
  const statusClass = `admin-status admin-status--${record.adminStatus.toLowerCase()}`;
  const categoryClass =
    record.category === "Residential"
      ? "admin-category--residential"
      : record.category === "Commercial"
        ? "admin-category--commercial"
        : "admin-category--land";
  const metadata = [
    record.bedrooms,
    record.bathrooms ? `${record.bathrooms} Bath` : record.floor,
    record.area,
  ].filter(Boolean);

  return (
    <tr>
      <td>
        <Image
          className="admin-property-image"
          src={record.image}
          alt={`${record.title} exterior`}
          width={128}
          height={72}
          unoptimized
        />
      </td>
      <td>
        <strong className="admin-property-title">{record.title}</strong>
        <span className="admin-property-meta">
          {metadata.map((item, index) => (
            <span key={`${item}-${index}`}>
              {index > 0 && <i />}
              {item}
            </span>
          ))}
        </span>
      </td>
      <td>
        <span className={`admin-category ${categoryClass}`}>{record.category}</span>
      </td>
      <td className="admin-price">{record.price}</td>
      <td>
        <span className="admin-location">
          <Icon name="pin" />
          {record.location}
        </span>
      </td>
      <td>
        <span className={statusClass}>{record.adminStatus}</span>
      </td>
      <td>
        <div className="admin-row-actions">
          <Link
            className="admin-button admin-button--edit"
            href={`/admin/properties/new?edit=${encodeURIComponent(record.id)}`}
          >
            <Icon name="edit" />
            Edit
          </Link>
          <button
            className="admin-button admin-button--status"
            type="button"
            onClick={() => onToggleStatus(record)}
          >
            {record.adminStatus === "Available" ? "Mark Sold" : "Mark Available"}
          </button>
          <button
            className="admin-icon-button admin-icon-button--delete"
            type="button"
            aria-label={`Delete ${record.title}`}
            onClick={() => onDelete(record)}
          >
            <Icon name="trash" />
          </button>
        </div>
      </td>
    </tr>
  );
}
