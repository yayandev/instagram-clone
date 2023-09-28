import Layout from "@/components/layout/Layout";
import Form from "./Form";
import Suggestion from "./Suggestion";

const Search = () => {
  return (
    <Layout>
      <div className="w-full">
        <div className="max-w-3xl mx-auto">
          <div className="w-full">
            <Form />
            <Suggestion />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
