"use client";
import React, { useEffect, useState } from 'react';


export default function JsonTable({ data: initialData = null, url = null, columns = null }) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(Boolean(url && !initialData));
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      if (!url) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (mounted) setData(json);
      } catch (err) {
        if (mounted) setError(err.message || 'Error al cargar');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    // sólo fetch si no hay initialData
    if (url && !initialData) load();
    return () => { mounted = false; };
  }, [url, initialData]);

    const inferredColumns = React.useMemo(() => {
    if (columns && columns.length) return columns;
    if (!data || !data.length) return [];
    const keys = Object.keys(data[0]);
    return keys.map(k => ({ key: k, label: k.replace(/_/g, ' ').replace(/\b\w/g, s => s.toUpperCase()) }));
  }, [columns, data]);

  return (
    <div className="principal">
      <h2 className="titulo">Tabla con Json</h2>

      {/*error */}
      {error && (
        <div className="p-3 mb-4 bg-red-50 border border-red-200 text-red-700 rounded">Error: {error}</div>
      )}

      <div className="bg-white shadow-sm rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 table-fixed">
          <thead className="bg-gray-50">
            <tr>
              {inferredColumns.map(col => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            
            {loading && (
              Array.from({ length: 6 }).map((_, i) => (
                <tr key={`skeleton-${i}`} className="animate-pulse">
                  {inferredColumns.map(col => (
                    <td key={col.key + i} className="px-4 py-4 whitespace-nowrap text-sm">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                    </td>
                  ))}
                </tr>
              ))
            )}

            
            {/*filas */}
            {!loading && data && data.map((row, rIdx) => (
              <tr key={rIdx} className="odd:bg-white even:bg-gray-50 hover:bg-gray-50">
                {inferredColumns.map(col => (
                  <td key={col.key} className="px-4 py-3 align-top text-sm text-gray-700 max-w-[220px] truncate">
                   {renderCellValue(row[col.key])}
                  </td>
                ))}
              </tr>
            ))}

          </tbody>
        </table>
      </div>

        
    </div>
  );
}

function renderCellValue(value) {
  if (value === null || value === undefined) return <span className="text-gray-400">—</span>;
  if (typeof value === 'boolean') return value ? 'Sí' : 'No';
  if (typeof value === 'number') return value;
  if (typeof value === 'string') return value;
  
  try {
    const s = JSON.stringify(value);
    if (s.length > 80) return s.slice(0, 77) + '...';
    return s;
  } catch (e) {
    return String(value);
  }
}

