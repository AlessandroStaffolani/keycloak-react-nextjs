import {useEffect} from 'react'
import { Header, Segment, Divider } from "semantic-ui-react";
import PageAction from "../components/PageAction";
import { ProtectedRoute } from "../lib/auth";

function Admin({setPageTitle}) {
  useEffect(() => {
    setPageTitle('Admin')
  }, [])
  return (
    <div>
      <Header as="h1">Admin page</Header>
      <Segment>
        <Header as="h3">Primary admin action</Header>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lacinia
          pharetra tincidunt. Mauris euismod et neque sed ornare. Duis auctor,
          diam a laoreet facilisis, eros mi tincidunt leo, quis lobortis nulla
          magna id sapien. Cras eu hendrerit turpis, sed molestie lacus. Nunc
          accumsan nunc sit amet efficitur auctor.
        </p>
        <PageAction resource={'admin'} action={'primary'} />
        <Divider section />
        <Header as="h3">Secondary admin action</Header>
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
        <PageAction resource={'admin'} action={'secondary'} />
      </Segment>
    </div>
  );
}

export default ProtectedRoute(Admin, 'admin')
