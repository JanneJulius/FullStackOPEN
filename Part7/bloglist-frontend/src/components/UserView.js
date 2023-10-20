import React from "react";
import TopBar from "./TopBar";
import { Link } from "react-router-dom";
import styled from "styled-components";

const UserViewContainer = styled.div`
  display: flex;
  margin: 30px 10px;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  border: 2px solid black;

  color: black;
`;

const UserTable = styled.table`
  margin: 20px;
  text-align: center;
  border-collapse: collapse;
  width: 100%;
`;

const UserTableHead = styled.thead`
  background-color: #e69833;
  color: white;
`;

const UserTableBody = styled.tbody`
  background-color: white;
`;

const UserTableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const UserTableCell = styled.td`
  padding: 10px;
`;

const UserView = ({ users }) => {
  return (
    <>
      <TopBar />
      <UserViewContainer>
        <h2>Users</h2>
        <UserTable className="user-table">
          <UserTableHead>
            <tr>
              <th>Username</th>
              <th>Blogs Created</th>
            </tr>
          </UserTableHead>
          <UserTableBody>
            {users
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((user, index) => (
                <UserTableRow key={index}>
                  <UserTableCell>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </UserTableCell>
                  <UserTableCell>{user.blogs.length}</UserTableCell>
                </UserTableRow>
              ))}
          </UserTableBody>
        </UserTable>
      </UserViewContainer>
    </>
  );
};

export default UserView;
