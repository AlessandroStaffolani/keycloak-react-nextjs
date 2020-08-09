import { useEffect, useState } from "react";
import useSWR from "swr";
import { axiosFetcher } from "../lib/utils";
import { Header } from "semantic-ui-react";
import PageContent from "../components/PageContent";
import LoadingPlaceholder from "../components/LoadingPlaceholder";

export default function Public({ setPageTitle, setGlobalMessage }) {
  const [pageLoading, setPageLoading] = useState(true);
  const { data, error } = useSWR("/api/public", axiosFetcher);

  useEffect(() => {
    setPageTitle("Public");
    if (data || error) {
      setPageLoading(false);
    }
    if (error) {
      setGlobalMessage({
        negative: true,
        header: "Error on loading the public's actions",
        content:
          "Try to reload the page, if the error persist contact the administrator",
      });
    }
  }, [data, error]);
  return (
    <div>
      <Header as="h1">Public page</Header>
      {pageLoading ? (
        <LoadingPlaceholder lines={5} blocks={2} />
      ) : (
        <PageContent actions={data.actions} />
      )}
    </div>
  );
}
