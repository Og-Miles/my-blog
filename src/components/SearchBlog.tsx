import algoliasearch from "algoliasearch/dist/algoliasearch-lite";

const [searchQuery, setSearchQuery] = React.useState("");
const [searchResults, setSearchResults] = React.useState([]);

const searchClient = algoliasearch(
  "QAJQY1OUMM",
  "81cc5249d31ecd1cd4b23a13e1f4698d"
);
const searchIndex = searchClient.initIndex("My First Application");

const searchBlog = async (query: any) => {
  try {
    const { hits } = await searchIndex.search(query);
    return hits;
  } catch (error) {
    console.error("Error searching:", error);
    return [];
  }
};
