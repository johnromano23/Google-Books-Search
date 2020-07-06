import React from "react";

function Form({ query, handleInputChange, handleFormSubmit }) {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="Query">
          <strong>Book</strong>
        </label>
        <input
          className="form-control"
          id="Title"
          type="text"
          // ADD VALUE ATTRIBUTE AND ASSIGN QUERY FROM INPUT ARGUMENT TO IT
          value={query}
          // ADD PLACEHOLDER ATTRIBUTE AND ASSIGN YOUR PLACEHOLDER TEXT HERE
          placeholder="/* ADD YOUR PLACEHOLDER TEXT HERE */"
          // ADD NAME ATTRIBUTE AND ASSIGN THE NAME THAT MATCHES THE INPUT ARGUMENT
          name="query"
          // ADD ONCHANGE EVENT ATTRIBUTE IN CAMELBACK CASE AND ASSIGN INPUT CHANGE EVENT CALLBACK FROM INPUT ARGUMENT TO IT
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="pull-right">
        <button
          // ADD ONCLICK EVENT ATTRIBUTE IN CAMELBACK CASE AND ASSIGN FORM SUBMIT EVENT CALLBACK FROM INPUT ARGUMEMT TO IT
          onClick={handleFormSubmit}
          type="submit"
          className="btn btn-lg btn-danger float-right"
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default Form;
