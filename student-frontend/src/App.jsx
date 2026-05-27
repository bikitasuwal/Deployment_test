import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// const API_BASE = "https://deployment-test-s7hb.onrender.com";

function App() {
  const [students, setStudents] = useState([]);

  const [form, setForm] = useState({
    name: "",
    subject: "",
    grade: "",
    marks: ""
  });

  // GET all students
  const loadStudents = () => {
    fetch(`https://deployment-test-s7hb.onrender.com/api/all/`)
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // handle input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // POST add student
  const submitData = (e) => {
    e.preventDefault();

    fetch(`https://deployment-test-s7hb.onrender.com/api/add/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(() => {
        alert("Student Added!");
        setForm({ name: "", subject: "", grade: "", marks: "" });
        loadStudents();
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="container mt-4">

      {/* HEADER */}
      <h1 className="text-center mb-4">
        Student Marks Management
      </h1>

      {/* ADD STUDENT FORM */}
      <div className="card p-3 mb-4 shadow">
        <h3>Add Student</h3>

        <form onSubmit={submitData}>

          <input
            className="form-control mb-2"
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            className="form-control mb-2"
            type="text"
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
          />

          <input
            className="form-control mb-2"
            type="text"
            name="grade"
            placeholder="Grade"
            value={form.grade}
            onChange={handleChange}
          />

          <input
            className="form-control mb-2"
            type="number"
            name="marks"
            placeholder="Marks"
            value={form.marks}
            onChange={handleChange}
          />

          <button className="btn btn-primary w-100">
            Add Student
          </button>

        </form>
      </div>

      {/* VIEW BUTTON */}
      <div className="text-center mb-3">
        <button className="btn btn-success" onClick={loadStudents}>
          View All Students
        </button>
      </div>

      {/* TABLE */}
      <div className="card p-3 shadow">

        <h3>All Students</h3>

        <table className="table table-striped table-hover mt-2">

          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Subject</th>
              <th>Grade</th>
              <th>Marks</th>
            </tr>
          </thead>

          <tbody>
            {students.length > 0 ? (
              students.map((s, index) => (
                <tr key={index}>
                  <td>{s.name}</td>
                  <td>{s.subject}</td>
                  <td>{s.grade}</td>
                  <td>{s.marks}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No students found
                </td>
              </tr>
            )}
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default App;