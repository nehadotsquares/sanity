export default {
  name: "dealRegistration",
  title: "Partner Deal Registration",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "submitText",
      title: "Submit Button Text",
      type: "string",
      initialValue: "Submit",
    },
  ],
}