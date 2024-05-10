import React, { useState } from "react";
import "./Assignment.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoAddCircleOutline } from "react-icons/io5";

function AssignmentCreation() {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignment, setAssignment] = useState("");
  const [exercises, setExercises] = useState([
    { question: "", options: ["", "", "", ""], correctAnswer: "" },
  ]);
  const [numQuestions, setNumQuestions] = useState(1);
  const [showSavedQuestions, setShowSavedQuestions] = useState(false);
  const [assignments, setAssignments] = useState([
    "Assignment 1",
    "Assignment 2",
  ]); // Initial assignments
  const [showInput, setShowInput] = useState(false);

  const handleAddAssignment = (e) => {
    e.preventDefault();
    const newAssignment = { assignment: assignment };
    console.log(newAssignment);

    // Update the options for the dropdown menu
    const newAssignmentOption = assignment;
    const updatedAssignments = [...assignments, newAssignmentOption];
    setAssignments(updatedAssignments);

    // Clear input field after adding assignment
    setAssignment("");
    setTitle("");
    setDueDate("");
    setShowInput(false);
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleAssignmentChange = (event) => {
    setAssignment(event.target.value);
  };

  const handleAddExercise = () => {
    // Clear existing exercises and add a new empty exercise
    setExercises([
      { question: "", options: ["", "", "", ""], correctAnswer: "" },
    ]);
    setTitle("");
    setDueDate("");
    setAssignment("");
    setShowInput(false);
  };

  const handleExerciseChange = (index, field, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[index][field] = value;
    setExercises(updatedExercises);
  };

  const handleOptionChange = (exerciseIndex, optionIndex, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].options[optionIndex] = value;
    setExercises(updatedExercises);
  };

  const handleCorrectAnswerChange = (exerciseIndex, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].correctAnswer = value;
    setExercises(updatedExercises);
  };

  const handleNumQuestionsChange = (event) => {
    const num = parseInt(event.target.value);
    if (!isNaN(num)) {
      setNumQuestions(num);
    }
  };

  const saveAssignment = () => {
    console.log("Assignment saved:", { title, dueDate, assignment, exercises });
    setShowSavedQuestions(true);
  };

  const addQuestions = () => {
    if (exercises.length > 0) {
      const newExercises = [...exercises];
      const numExercises = newExercises.length;
      const numQuestionsToAdd = Math.min(numQuestions, 20 - numExercises);
      for (let i = 0; i < numQuestionsToAdd; i++) {
        newExercises.push({
          question: "",
          options: ["", "", "", ""],
          correctAnswer: "",
        });
      }
      setExercises(newExercises);
    }
  };

  const handleAddClick = () => {
    setShowInput(true);
  };

  return (
    <div className="container">
      <h2 className="my-4">Assignment Creation</h2>

      <div className="row mb-3">
        <div className="col-md-1">
          <label htmlFor="title" className="form-label">
            Assignment Title :
          </label>
        </div>
        <div className="col-md-2">
          <input
            className="form-control"
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            onChange={handleChange}
            value={title}
          />
        </div>
        <div className="col-md-1">
          <label htmlFor="Assignment" className="form-label">
            Assignment to class :
          </label>
        </div>
        <div className="col-md-2">
          <select
            className="col-md-2 form-select"
            name="Assignment"
            id="Assignment"
            onChange={handleAssignmentChange}
            value={assignment}>
            <option value="">Select Assignment</option>
            {assignments.map((assignment, index) => (
              <option key={index} value={assignment}>
                {assignment}
              </option>
            ))}
          </select>
          {showInput && (
            <div>
              <input
                className="form-control"
                type="text"
                value={assignment}
                onChange={handleAssignmentChange}
              />
              <button onClick={handleAddAssignment}>Save</button>
            </div>
          )}
          <button className="btn" onClick={handleAddClick}>
            <IoAddCircleOutline />
            Add
          </button>
        </div>
        <div className="col-md-1">
          <label htmlFor="duedate" className="form-label">
            Date :
          </label>
        </div>
        <div className="col-md-2">
          <input
            type="date"
            name="dueDate"
            id="duedate"
            className="form-control"
            onChange={handleDateChange}
            value={dueDate}
          />
        </div>
      </div>

      <div>
        <h3 className="mb-3">Exercises</h3>
        <ul className="list-group mb-3">
          {exercises.map((exercise, index) => (
            <li
              key={index}
              className="list-group-item mb-3"
              style={{ borderRadius: "10px" }}>
              <input
                className="form-control mb-2"
                type="text"
                value={exercise.question}
                onChange={(e) =>
                  handleExerciseChange(index, "question", e.target.value)
                }
                placeholder={` Question ${index + 1}`}
              />
              <ul className="list-group mb-3">
                {exercise.options.map((option, optionIndex) => (
                  <li key={optionIndex} className="list-group-item">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(index, optionIndex, e.target.value)
                      }
                      placeholder={`Option ${optionIndex + 1}`}
                      className="form-control mb-2"
                    />
                  </li>
                ))}
              </ul>
              <input
                type="text"
                value={exercise.correctAnswer}
                onChange={(e) =>
                  handleCorrectAnswerChange(index, e.target.value)
                }
                placeholder={`Correct Answer (1, 2, 3, 4)`}
                className="form-control"
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="row mt-4">
        <div className="col-md-4">
          <button type="button" onClick={handleAddExercise}>
            Add Exercise
          </button>
        </div>
        <div className="col-md-4">
          <input
            type="number"
            className="form-control"
            value={numQuestions}
            onChange={handleNumQuestionsChange}
            min="1"
            max="20"
          />
        </div>
        <div className="col-md-4 d-flex justify-content-end">
          <button type="button" onClick={addQuestions}>
            Add Questions
          </button>
          <button type="button" onClick={saveAssignment}>
            Save
          </button>
        </div>
      </div>

      {showSavedQuestions && exercises.length > 0 && (
        <div className="row mt-4">
          <div className="col-md-12">
            <h3>Saved Questions</h3>
            <ul>
              {exercises.map((exercise, index) => (
                <li key={index}>
                  <h4>Question {index + 1}</h4>
                  <p>{exercise.question}</p>
                  <p>Options: {exercise.options.join(", ")}</p>
                  <p>Correct Answer: {exercise.correctAnswer}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default AssignmentCreation;
