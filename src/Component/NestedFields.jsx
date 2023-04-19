import { Select, Button, Box, Input, Text } from "@chakra-ui/react";

const FieldTypes = ["String", "Number", "Boolean", "Object"];
function NestedFields({ fields, onChange }) {
  const handleNestedFieldChange = (index, field) => {
    const updatedFields = [...fields];
    updatedFields[index] = field;
    onChange(updatedFields);
  };

  const handleAddNestedField = () => {
    onChange([...fields, { name: "", type: "" }]);
  };

  const handleDelete = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    onChange(updatedFields);
  };

  return (
    <Box>
      {fields.map((field, index) => (
        <Box width={"50%"} m="auto" key={index}>
          <Text>Nested Object</Text>
          <Input
            type="text"
            value={field.name}
            onChange={(e) =>
              handleNestedFieldChange(index, { ...field, name: e.target.value })
            }
          />
          <Select
            value={field.type}
            onChange={(e) =>
              handleNestedFieldChange(index, { ...field, type: e.target.value })
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
                handleNestedFieldChange(index, { ...field, nestedFields })
              }
            />
          )}
          <Button
            backgroundColor={"red"}
            color={"white"}
            mt={2}
            onClick={() => handleDelete(index)}
          >
            Delete
          </Button>
          <Button
            backgroundColor={"red"}
            color={"white"}
            onClick={handleAddNestedField}
            ml={2}
            mt={2}
          >
            Add Nested Field
          </Button>
        </Box>
      ))}
    </Box>
  );
}
export default NestedFields;
