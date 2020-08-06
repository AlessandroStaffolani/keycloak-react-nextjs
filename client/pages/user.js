import Layout from "../components/Layout";
import { Header, Segment, Divider } from "semantic-ui-react";
import PageAction from "../components/PageAction";

export default function User() {
  const title = "User";
  return (
    <Layout title={title}>
      <Header as="h1">User page</Header>
      <Segment>
        <Header as="h3">Primary user action</Header>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lacinia
          pharetra tincidunt. Mauris euismod et neque sed ornare. Duis auctor,
          diam a laoreet facilisis, eros mi tincidunt leo, quis lobortis nulla
          magna id sapien. Cras eu hendrerit turpis, sed molestie lacus. Nunc
          accumsan nunc sit amet efficitur auctor.
        </p>
        <div className="text-right">
          <PageAction
            color={"green"}
            title={"Primary user action"}
            message={
              "Primary user action has been clicked without authorization"
            }
          />
        </div>
        <Divider section />
        <Header as="h3">Secondary user action</Header>
        <p>
          Sed id tortor massa. Nunc sodales faucibus elit, et eleifend libero
          vehicula vitae. Pellentesque habitant morbi tristique senectus et
          netus et malesuada fames ac turpis egestas. Aliquam tellus erat,
          vehicula in nisi ac, pharetra facilisis purus. Vestibulum ac nisi eu
          mi scelerisque consequat id vitae arcu. Quisque varius ut purus nec
          blandit. In hac habitasse platea dictumst. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Sed sapien elit, sagittis vel dapibus
          quis, rutrum eu nulla. Maecenas porta dui in venenatis luctus. Etiam
          tempor euismod viverra.
        </p>
        <div className="text-right">
          <PageAction
            color={"blue"}
            title={"Secondary user action"}
            message={
              "Secondary user action has been clicked without authorization"
            }
          />
        </div>
      </Segment>
    </Layout>
  );
}