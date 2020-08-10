import {useEffect, useState} from 'react'
import { Header } from "semantic-ui-react";
import useAuth, { ProtectedRoute } from "../lib/auth";
import useSWR from "swr";
import {axiosFetcher} from "../lib/utils";
import LoadingPlaceholder from "../components/LoadingPlaceholder";
import PageContent from "../components/PageContent";

function Admin({setPageTitle, setGlobalMessage}) {
  const { loading } = useAuth();
  const [pageLoading, setPageLoading] = useState(true);
  const { data, error } = useSWR(loading ? false : "/api/admin", axiosFetcher);

  useEffect(() => {
    setPageTitle("Admin");
    if (data || error) {
      setPageLoading(false);
    }
    if (error) {
      setGlobalMessage({
        negative: true,
        header: "Error on loading the admin's actions",
        content:
          "Try to reload the page, if the error persist contact the administrator",
      });
    }
  }, [data, error]);
  return (
    <div>
      <Header as="h1">Admin page</Header>
      {pageLoading && !error ? (
        <LoadingPlaceholder lines={5} blocks={2} />
      ) : (
        <PageContent actions={data ? data.actions : []} />
      )}
    </div>
  );
}

export default ProtectedRoute(Admin, 'admin')
