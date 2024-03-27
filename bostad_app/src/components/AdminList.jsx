import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// TODO Göra om så att det passar våran listings.

function AdminList() {
  const [courses, setCourses] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  // Add listing form
  const [showAddModal, setShowAddModal] = useState(false);
  // Form variables
  const [courseName, setCourseName] = useState("");
  const [courseNameError, setCourseNameError] = useState("");
  const [creditsError, setCreditsError] = useState("");
  const [credits, setCredits] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");

  async function fetchCourses() {
    try {
      const response = await fetch("http://localhost:8000/course", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setCourses(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  function deleteCourseFromState(courseId) {
    const newCourses = courses.filter((course) => course.id !== courseId);
    setCourses(newCourses);
  }

  async function deleteCourse(courseId) {
    try {
      const response = await fetch(`http://localhost:8000/course/${courseId}`, {
      method: "DELETE",  
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      // check for error response
      if (!response.ok) {
        // get error message from body or default to response status
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      deleteCourseFromState(courseId);
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteModalOpen(false);
    }
  }

  function validateForm() {
    let isValid = true;
    // Reset error messages
    setCourseNameError("");
    setCreditsError("");

    // Name validation
    if (!courseName.trim()) {
      setCourseNameError("Du måste skriva ett namn på kursen");
      isValid = false;
    }
    if (credits < 0) {
      setCreditsError("Poängen måste vara över 0");
      isValid = false;
    }

    return isValid;
  }

  async function addCourseSubmit(e) {
    e.preventDefault();

    let isValid = validateForm();
    if(isValid === false) {
      return;
    }
    const data = JSON.stringify({
      name: courseName,
      credits: credits ? parseInt(credits, 10) : null, // Ensure credits is an integer or null
      start_date: startDate || null,
      end_date: endDate || null,
      description,
    });
    try {
      const response = await fetch("http://localhost:8000/course", {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
      });
      const data2 = await response.json();
      if (!response.ok) {
        console.log(data2);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if(response.status == 402){
        setServerErrorMessage("Failed to add course")
      }

      // Handle success - you might want to close the modal and refresh the courses list
      setShowAddModal(false);
    } catch (error) {
      
      console.error("Failed to add course:", error);
    }
  }

  return (
    <div className="min-w-xl">
      <div className="min-h-screen my-0 border shadow-md"
              style={{
                background:
                  "linear-gradient(to bottom, #FFFFFF, #EBF5FB, #E8F8F5, #E8F6F3, #D0ECE7, #D1F2EB, #EAFAF1 )",
              }}>
        {/* DELETE MODAL START */}
        {deleteModalOpen && (
          <div className="fixed inset-0 z-50 flex overflow-auto bg-gray-800 bg-opacity-50">
            <div className="relative flex flex-col w-full max-w-md p-8 m-auto bg-white rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold">Bekräfta borttagning</h2>
              <p className="my-4">Är du säker på att du vill ta bort kursen?</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="px-4 py-2 text-black bg-gray-200 rounded"
                >
                  Avbryt
                </button>
                <button
                  onClick={() => deleteCourse(selectedCourseId)}
                  className="px-4 py-2 text-white bg-red-600 rounded"
                >
                  Radera
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ADD COURSE MODAL START */}

        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-800 bg-opacity-50">
            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:w-1/2">
              <form
                className="px-4 py-6 sm:p-8"
                onSubmit={addCourseSubmit}
                noValidate
              >
                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  {/* Course Name */}
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="course-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Listing
                    </label>
                    <div className="mt-2">
                      <input
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        type="text"
                        name="name"
                        id="course-name"
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {courseNameError && <div className="text-red-700">Du måste ha ett listing namn</div>}
                  </div>

                  {/* Credits */}
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="credits"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Poäng
                    </label>
                    <div className="mt-2">
                      <input
                        value={credits}
                        onChange={(e) => setCredits(e.target.value)}
                        type="number"
                        name="credits"
                        id="credits"
                        min="0"
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  {/* Start Date */}
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="start-date"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Startdatum
                    </label>
                    <div className="mt-2">
                      <input
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        type="date"
                        name="startDate"
                        id="start-date"
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  {/* End Date */}
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="end-date"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Slutdatum
                    </label>
                    <div className="mt-2">
                      <input
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        type="date"
                        name="endDate"
                        id="end-date"
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Beskriving
                    </label>
                    <div className="mt-2">
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        name="description"
                        id="description"
                        rows="5"
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end px-4 py-4 border-t gap-x-6 border-gray-900/10 sm:px-8">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                    onClick={() => setShowAddModal(false)}
                  >
                    Stäng
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Skapa
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ADD COURSE MODAL END */}

        <div className="p-6">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <p className="mt-2 text-2xl font-semibold text-black">
                Dina listings
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                onClick={() => setShowAddModal(true)}
                type="button"
                className="block px-6 py-4 text-sm font-semibold text-center text-black rounded-md shadow-sm hover:bg-white hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" style={{
                  background:
                    "linear-gradient(to right, #D6E6F2, #F3E2E7)",
                }}
              >
                Skapa en listing
              </button>
            </div>
          </div>
          <div className="flow-root mt-8">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        Lisintg
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Startdatum
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Slutdatum
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                      >
                        <span className="sr-only">Ändra</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {courses.map((course) => (
                      <tr key={course.id}>
                        <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-0">
                          Namn
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {course.credits}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {course.start_date}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {course.end_date}
                        </td>
                        <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-0">
                          <a
                            href="#"
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Ändra
                            <span className="sr-only"></span>
                          </a>
                        </td>
                        <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-0">
                          <button
                            onClick={() => {
                              setDeleteModalOpen(true);
                              setSelectedCourseId(course.id);
                            }}
                            className="ml-8 text-red-700 hover:text-red-900"
                          >
                            Radera
                            <span className="sr-only"></span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminList;
