import React from "react";

const UserProfile = (props) => {
  return (
    <div>
      <h1>{props.username}</h1>
    </div>
  );
};

export default UserProfile;

export async function getServerSideProps(context) {
  /* this function will run on every incoming request */

  const { params, req, res } = context;
  console.log("Server side code");
  console.log(req);
  console.log(res);
  return {
    props: {
      username: "prabhat",
    },
  };
}
