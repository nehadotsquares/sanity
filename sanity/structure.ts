import { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
       
        S.listItem()
        .title("Navigation")
        .child(S.document().schemaType("navigation").documentId("navigation")),

        S.listItem()
        .title("Footer")
        .child(S.document().schemaType("footer").documentId("footer")),

         S.listItem()
        .title("Career Page")
        .child(S.document().schemaType("careerPage").documentId("careerPage")),

        ...S.documentTypeListItems().filter(
            (item) => !["navigation", "footer", "careerPage"].includes(item.getId() || "")
        ),
    ]);