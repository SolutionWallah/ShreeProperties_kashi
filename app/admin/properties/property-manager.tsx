"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Icon } from "../../components/icons";
import type { AdminProperty, AdminStatus } from "../data";
import { deletePropertyApi, fetchAdminPropertiesList, updatePropertyApi } from "../data";

const filters: Array<"All" | AdminStatus> = ["All", "Available", "Sold", "Rented", "Leased"];
const pageSize = 6;

export function AdminPropertyManager() {
  const [records, setRecords] = useState<AdminProperty[]>([]);
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProperties = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchAdminPropertiesList({
        page,
        limit: pageSize,
        status: filter,
        query: query.trim() || undefined,
      });
      setRecords(data.properties);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch (err: any) {
      setError(err.message || "Failed to load properties from server.");
    } finally {
      setLoading(false);
    }
  }, [page, filter, query]);

  useEffect(() => {
    loadProperties();
  }, [loadProperties]);

  async function toggleSold(record: AdminProperty) {
    try {
      const nextStatus: AdminStatus = record.adminStatus === "Available" ? "Sold" : "Available";
      await updatePropertyApi(record.slug || record.id, {
        status: nextStatus,
      });
      await loadProperties();
    } catch (err: any) {
      alert(`Could not update status: ${err.message}`);
    }
  }

  async function deleteRecord(record: AdminProperty) {
    if (!window.confirm(`Are you sure you want to delete "${record.title}"?`)) return;
    try {
      await deletePropertyApi(record.slug || record.id);
      await loadProperties();
    } catch (err: any) {
      alert(`Could not delete property: ${err.message}`);
    }
  }

  return (
    <section className="admin-panel" aria-labelledby="admin-list-title">
      <div className="admin-panel-heading">
        <h2 id="admin-list-title">
          <Icon name="building" />
          Added Properties <span>({total})</span>
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
              {status}
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

      {error && (
        <div
          style={{
            padding: "1rem",
            margin: "1rem 0",
            background: "#fef2f2",
            color: "#991b1b",
            borderRadius: "8px",
          }}
        >
          {error}
        </div>
      )}

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
            {loading ? (
              <tr>
                <td className="admin-empty" colSpan={7}>
                  <strong>Loading properties...</strong>
                </td>
              </tr>
            ) : records.length > 0 ? (
              records.map((record) => (
                <AdminPropertyRow
                  key={record.id}
                  record={record}
                  onToggleStatus={toggleSold}
                  onDelete={deleteRecord}
                />
              ))
            ) : (
              <tr>
                <td className="admin-empty" colSpan={7}>
                  <strong>No properties found in database</strong>
                  <span>Click "Add Property" to create your first listing.</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="admin-pagination">
        <span>
          Showing {total ? (page - 1) * pageSize + 1 : 0}–{Math.min(page * pageSize, total)} of{" "}
          {total} properties
        </span>
        <div>
          <button type="button" disabled={page <= 1} onClick={() => setPage(page - 1)}>
            <Icon name="chevron" />
            Previous
          </button>
          <span className="admin-page-number">{page}</span>
          <button type="button" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
            Next
            <Icon name="chevron" />
          </button>
        </div>
      </div>
    </section>
  );
}

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
        {record.image ? (
          <Image
            className="admin-property-image"
            src={record.image}
            alt={`${record.title} exterior`}
            width={128}
            height={72}
            unoptimized
          />
        ) : (
          <div className="admin-property-image admin-property-image--empty">No photo</div>
        )}
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
            href={`/admin/properties/new?edit=${encodeURIComponent(record.slug || record.id)}`}
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
