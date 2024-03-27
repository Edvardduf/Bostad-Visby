import React, { useState } from "react";
import Spinner from "./Spinner";

function AdminTable(data) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [formData, setFormData] = useState({});
  const [rows, setRows] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };
  
  async function deleteRow(rowId) {
    console.log(`http://localhost:8000/${data.url}/${rowId}`);
    try {
      const response = await fetch(
        `http://localhost:8000/${data.url}/${rowId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // check for error response
      if (!response.ok) {
        // get error message from body or default to response status
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // deleteRowFromState(rowId);
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteModalOpen(false);
      window.location.reload();
    }
  }

  async function editRow(rowId) {
    console.log(`http://localhost:8000/${data.url}/${rowId}`);
    console.log(formData);
    console.log(JSON.stringify(formData));
    try {
      const response = await fetch(
        `http://localhost:8000/${data.url}/${rowId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        }
      );
      // check for error response
      if (!response.ok) {
        if (response.status === 422) {
          const errorData = await response.json(); // Parse response body as JSON
          throw new Error(errorData.message); // Throw error with the message received from the server
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }
      // deleteRowFromState(rowId);
    } catch (error) {
      console.log(error);
    } finally {
      setEditModalOpen(false);
      // window.location.reload();
    }
  }

  const keys =
    data && data.data && data.data.length > 0
      ? Object.keys(data.data[0])
      : null;

  return (
    <div className="flow-root mt-8 p-4">
      {keys ? (
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  {keys.map((key) => (
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      key={key}
                    >
                      {key}
                    </th>
                  ))}
                  <th className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Ändra</span>
                  </th>
                  <th className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Radera</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {editModalOpen && (
                  <div className="fixed inset-0 z-50 flex overflow-auto bg-gray-800 bg-opacity-50">
                    <div className="relative flex flex-col w-full max-w-md p-8 m-auto bg-white rounded-lg shadow-lg">
                      <h2 className="text-xl font-semibold">Ändra rad</h2>
                      <form
                        method="put"
                        onSubmit={(e) => {
                          e.preventDefault();
                          editRow(selectedId);
                        }}
                      >
                        {keys.map((key) => (
                          <div key={key}>
                            <label htmlFor={key} className="block">
                              {key}
                            </label>
                            <input
                              type="text"
                              id={key}
                              name={key}
                              value={formData[key]}
                              onChange={handleChange}
                              className="border border-gray-300 rounded-md p-2 mb-4"
                            />
                          </div>
                        ))}
                        <div className="flex justify-end space-x-4">
                          <button
                            onClick={() => setEditModalOpen(false)}
                            className="px-4 py-2 text-black bg-gray-200 rounded"
                          >
                            Avbryt
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 text-white bg-green-600 rounded"
                          >
                            Godkänn
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
                {deleteModalOpen && (
                  <div className="fixed inset-0 z-50 flex overflow-auto bg-gray-800 bg-opacity-50">
                    <div className="relative flex flex-col w-full max-w-md p-8 m-auto bg-white rounded-lg shadow-lg">
                      <h2 className="text-xl font-semibold">
                        Bekräfta borttagning
                      </h2>
                      <p className="my-4">
                        Är du säker på att du vill ta bort denna rad?
                      </p>
                      <div className="flex justify-end space-x-4">
                        <button
                          onClick={() => setDeleteModalOpen(false)}
                          className="px-4 py-2 text-black bg-gray-200 rounded"
                        >
                          Avbryt
                        </button>
                        <button
                          onClick={() => deleteRow(selectedId)}
                          className="px-4 py-2 text-white bg-red-600 rounded"
                        >
                          Radera
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {data.data.map((item, index) => (
                  <tr key={index} className=" mx-4">
                    {/* Dynamically render table data based on keys */}
                    {keys.map((key) => (
                      <td
                        className="px-6 py-6 whitespace-nowrap"
                        key={`${index}-${key}`}
                      >
                        {typeof item[key] === "object"
                          ? JSON.stringify(item[key])
                          : item[key]}
                      </td>
                    ))}
                    <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-0">
                      <button
                        className="ml-8 text-indigo-600 hover:text-indigo-900"
                        onClick={() => {
                          setEditModalOpen(true);
                          setFormData(item);
                          setSelectedId(item.id);
                        }}
                      >
                        Ändra<span className="sr-only"></span>
                      </button>
                    </td>
                    <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-0">
                      <button
                        className="ml-8 text-red-700 hover:text-red-900"
                        onClick={() => {
                          setDeleteModalOpen(true);
                          setSelectedId(item.id);
                        }}
                      >
                        Radera<span className="sr-only"></span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default AdminTable;
