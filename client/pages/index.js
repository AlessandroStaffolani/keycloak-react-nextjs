import {useEffect} from 'react'
import { Header, List } from "semantic-ui-react";
import Link from "next/link";

export default function Home({setPageTitle}) {

  useEffect(() => {
    setPageTitle('Home')
  }, [])

  return (
    <div>
      <Header as="h1">Home page</Header>
      <p>
        Sample web application which shows how to manage different levels of
        authorization using{" "}
        <a href="https://www.keycloak.org/" target="_blank">
          Keycloak
        </a>
        .
      </p>
      <hr />
      <p>
        The web application has 3 pages with different levels of authorization:
      </p>
      <List bulleted>
        <List.Item>
          <List.Header>
            Public
          </List.Header>
          <List.Description>
            This page has no restrictions, everybody can visit it without any
            authorization.
          </List.Description>
        </List.Item>
        <List.Item>
          <List.Header>
            User
          </List.Header>
          <List.Description>
            This page has the basic level of restriction, only regular user,
            which are logged into the application, can visit this page.
          </List.Description>
        </List.Item>
        <List.Item>
          <List.Header>
            Admin
          </List.Header>
          <List.Description>
            This page has the highest level of restriction, only admin user,
            which are logged into the application with full permission, can
            visit this page.
          </List.Description>
        </List.Item>
      </List>
      <hr />
      <p className='small-text'>
        Try to log in in order to use the User and Admin pages.
      </p>
    </div>
  );
}
