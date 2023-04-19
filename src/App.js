import React, { useState } from "react";
import "./App.css";
import { Select, Button, Box, Input, Text } from "@chakra-ui/react";
import NestedFields from "./Component/NestedFields";

const FieldTypes = ["String", "Number", "Boolean", "Object"];

function App() {
  const [fields, setFields] = useState([{ name: "", type: "" }]);

  const handleFieldChange = (index, field) => {
    const updatedFields = [...fields];
    updatedFields[index] = field;
    setFields(updatedFields);
  };

  const handleAddField = () => {
    setFields([...fields, { name: "", type: "" }]);
  };

  const handleDeleteField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const handleNestedFieldsChange = (index, nestedFields) => {
    const updatedFields = [...fields];
    updatedFields[index].nestedFields = nestedFields;
    setFields(updatedFields);
  };

  const handleConsoleValue = () => {
    console.log(fields);
  };

  return (
    <Box w={"50%"} m={"auto"} className="App">
      <Text fontSize={"2xl"}>Cosmocloud Assignment</Text>
      <Button float={"right"} mb={2} mt={6} onClick={handleAddField}>
        +
      </Button>
      {fields.map((field, index) => (
        <Box key={index}>
          <Input
            type="text"
            value={field.name}
            onChange={(e) =>
              handleFieldChange(index, { ...field, name: e.target.value })
            }
          />
          <Select
            value={field.type}
            onChange={(e) =>
              handleFieldChange(index, {
                ...field,
                type: e.target.value,
              })
            }
          >
            <option value="">Select a type</option>
            {FieldTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
          {field.type === "Object" && (
            <NestedFields
              fields={field.nestedFields || [{ name: "", type: "" }]}
              onChange={(nestedFields) =>
                handleNestedFieldsChange(index, nestedFields)
              }
            />
          )}
          <Button mt={2} onClick={() => handleDeleteField(index)}>
            Delete
          </Button>
        </Box>
      ))}
      <Button mt={2} onClick={handleConsoleValue}>
        Save
      </Button>
    </Box>
  );
}

export default App;
