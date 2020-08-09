import { useEffect, useState } from "react";
import useAuth from "../lib/auth";
import { Header } from "semantic-ui-react";
import { ProtectedRoute } from "../lib/auth";
import useSWR from "swr";
import { axiosFetcher } from "../lib/utils";
import PageContent from "../components/PageContent";
import LoadingPlaceholder from "../components/LoadingPlaceholder";

function User({ setPageTitle, setGlobalMessage }) {
  const { loading } = useAuth();
  const [pageLoading, setPageLoading] = useState(true);
  const { data, error } = useSWR(loading ? false : "/api/user", axiosFetcher);

  useEffect(() => {
    setPageTitle("User");
    if (data || error) {
      setPageLoading(false);
    }
    if (error) {
      setGlobalMessage({
        negative: true,
        header: "Error on loading the user's actions",
        content:
          "Try to reload the page, if the error persist contact the administrator",
      });
    }
  }, [data, error]);
  return (
    <div>
      <Header as="h1">User page</Header>
      {pageLoading && !error ? (
        <LoadingPlaceholder lines={5} blocks={2} />
      ) : (
        <PageContent actions={data.actions} />
      )}
    </div>
  );
}

export default ProtectedRoute(User, "user");
